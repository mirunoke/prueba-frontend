"use client";

import { useState } from "react";
import { Vehicle } from "@/types/vehicles/list-vehicles/Vehicle";

interface UpdateVehicleResponse {
  status: string;
  message: string;
  vehicle: Vehicle;
}

export function useUpdateVehicle() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://back-prueba-qibm.onrender.com";

  const updateVehicle = async (id: string, payload: Partial<Vehicle>): Promise<Vehicle | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/vehicles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error al actualizar vehículo: ${response.status}`);
      }

      const data = await response.json() as UpdateVehicleResponse;
      
      if (data.status !== 'success') {
        throw new Error(data.message || 'Error desconocido al actualizar el vehículo');
      }

      return data.vehicle;
    } catch (err) {
      setError(err as Error);
      console.error("Error updating vehicle:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateVehicle, loading, error };
} 