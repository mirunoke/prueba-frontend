"use client";

import { useState } from "react";

interface HyundaiInspectionPayload {
  battery_charge: number;
  front_left: number;
  front_right: number;
  rear_left: number;
  rear_right: number;
  comments?: string;
  images?: string[];
}

interface HyundaiInspectionResponse {
  status: string;
  message: string;
  inspection: any;
}

interface UseAddHyundaiInspectionReturn {
  addInspection: (vehicleId: string, payload: HyundaiInspectionPayload) => Promise<HyundaiInspectionResponse>;
  loading: boolean;
  error: Error | null;
}

export function useAddHyundaiInspection(): UseAddHyundaiInspectionReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://back-prueba-qibm.onrender.com";

  const addInspection = async (
    vehicleId: string,
    payload: HyundaiInspectionPayload
  ): Promise<HyundaiInspectionResponse> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${BACKEND_URL}/inspections/hyundai/${vehicleId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error al realizar la inspección: ${response.status}`);
      }
      
      const data = await response.json() as HyundaiInspectionResponse;
      
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