"use client";

import { useState } from "react";
import {
  AddVehiclePayload,
  AddVehicleSuccessResponse
} from "@/types/vehicles/add-vehicles/AddVehiclePayload";

interface UseAddVehiclesReturn {
  addVehicle: (payload: AddVehiclePayload) => Promise<AddVehicleSuccessResponse>;
  loading: boolean;
  error: Error | null;
}

export function useAddVehicles(): UseAddVehiclesReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://back-prueba-qibm.onrender.com";

  const addVehicle = async (
    payload: AddVehiclePayload
  ): Promise<AddVehicleSuccessResponse> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/vehicles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Error al agregar vehículo: ${res.status}`);
      }
      
      const data = (await res.json()) as AddVehicleSuccessResponse;
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err as Error);
      throw err;
    }
  };

  return {
    addVehicle,
    loading,
    error,
  };
}
