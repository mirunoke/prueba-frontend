"use client";

import { useState } from "react";

interface DeleteVehicleResponse {
  status: string;
  message: string;
  data?: {
    id: string;
    vin: string;
    client_name: string;
    inspections_removed: number;
  };
}

export function useDeleteVehicle() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://back-prueba-qibm.onrender.com";

  const deleteVehicle = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setResponseMessage("");

    try {
      const response = await fetch(`${BACKEND_URL}/vehicles/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error al eliminar vehículo: ${response.status}`);
      }

      const data = await response.json() as DeleteVehicleResponse;
      
      if (data.status !== 'success') {
        throw new Error(data.message || 'Error desconocido al eliminar el vehículo');
      }

      setResponseMessage(data.message || "Vehículo eliminado correctamente");

      return true;
    } catch (err) {
      setError(err as Error);
      console.error("Error deleting vehicle:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteVehicle, loading, error, responseMessage };
} 