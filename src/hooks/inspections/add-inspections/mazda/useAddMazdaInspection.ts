"use client";

import { useState } from "react";

type LightStatus = "Buen Estado" | "Cambio Recomendado" | "Requiere Cambio";

interface MazdaInspectionPayload {
  front_lights_status: LightStatus;
  rear_lights_status: LightStatus;
  battery_charge: number;
  comments?: string;
  images?: string[];
}

interface MazdaInspectionResponse {
  status: string;
  message: string;
  inspection: any;
}

interface UseAddMazdaInspectionReturn {
  addInspection: (vehicleId: string, payload: MazdaInspectionPayload) => Promise<MazdaInspectionResponse>;
  loading: boolean;
  error: Error | null;
}

export function useAddMazdaInspection(): UseAddMazdaInspectionReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://back-prueba-qibm.onrender.com";

  const addInspection = async (
    vehicleId: string,
    payload: MazdaInspectionPayload
  ): Promise<MazdaInspectionResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/inspections/mazda/${vehicleId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error al realizar la inspección: ${response.status}`);
      }
      const data = await response.json() as MazdaInspectionResponse;
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