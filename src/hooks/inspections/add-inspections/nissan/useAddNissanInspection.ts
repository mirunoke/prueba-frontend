"use client";

import { useState } from "react";

type LightStatus = "Buen Estado" | "Cambio Recomendado" | "Requiere Cambio";

interface NissanInspectionPayload {
  front_lights_status: LightStatus;
  rear_lights_status: LightStatus;
  comments?: string;
  images?: string[];
}

interface NissanInspectionResponse {
  status: string;
  message: string;
  inspection: any;
}

interface UseAddNissanInspectionReturn {
  addInspection: (vehicleId: string, payload: NissanInspectionPayload) => Promise<NissanInspectionResponse>;
  loading: boolean;
  error: Error | null;
}

export function useAddNissanInspection(): UseAddNissanInspectionReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://back-prueba-qibm.onrender.com";

  const addInspection = async (
    vehicleId: string,
    payload: NissanInspectionPayload
  ): Promise<NissanInspectionResponse> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${BACKEND_URL}/inspections/nissan/${vehicleId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error al realizar la inspección: ${response.status}`);
      }
      
      const data = await response.json() as NissanInspectionResponse;
      
      if (data.status !== "success") {
        throw new Error(data.message || "Error desconocido al realizar la inspección");
      }
      
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    addInspection,
    loading,
    error,
  };
} 