"use client";

import { useState } from "react";

interface DeleteInspectionResponse {
  status: string;
  message: string;
  data?: {
    id: string;
  };
}

export function useDeleteInspection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://back-prueba-qibm.onrender.com";

  const deleteInspection = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setResponseMessage("");

    try {
      const response = await fetch(`${BACKEND_URL}/inspections/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => undefined);
        throw new Error(errorData?.message || `Error al eliminar inspección: ${response.status}`);
      }

      const data = (await response.json()) as DeleteInspectionResponse;
      if (data.status !== "success") {
        throw new Error(data.message || "Error desconocido al eliminar la inspección");
      }

      setResponseMessage(data.message || "Inspección eliminada correctamente");
      return true;
    } catch (err) {
      setError(err as Error);
      console.error("Error deleting inspection:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteInspection, loading, error, responseMessage };
} 