"use client";

import { useState } from "react";
import { Inspection } from "@/types/inspections/Inspection";
import { UpdateNissanInspectionPayload } from "@/types/inspections/list-inspections/nissan/UpdateInspection";

interface UpdateInspectionResponse {
  status: string;
  message: string;
  inspection: Inspection;
}

export function useUpdateNissanInspection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://back-prueba-qibm.onrender.com";

  const updateInspection = async (id: string, payload: UpdateNissanInspectionPayload): Promise<Inspection | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/inspections/nissan/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => undefined);
        throw new Error(errorData?.message || `Error al actualizar inspección: ${response.status}`);
      }

      const data = (await response.json()) as UpdateInspectionResponse;
      if (data.status !== "success") {
        throw new Error(data.message || "Error desconocido al actualizar la inspección");
      }

      return data.inspection;
    } catch (err) {
      setError(err as Error);
      console.error("Error updating inspection:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateInspection, loading, error };
}
