"use client";

import { useEffect, useState } from "react";

interface MazdaVehicle {
  id: string;
  vin: string;
  client_name: string;
  model: string;
  year: number;
  license_plate: string;
  received_at: string;
}

interface UseGetMazdaVehiclesReturn {
  vehicles: MazdaVehicle[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useGetMazdaVehicles(): UseGetMazdaVehiclesReturn {
  const [vehicles, setVehicles] = useState<MazdaVehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://back-prueba-qibm.onrender.com";

  const fetchVehicles = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/vehicles?brand=Mazda&status=pendiente`);
      if (!response.ok) {
        throw new Error(`Error al obtener vehículos: ${response.status}`);
      }
      const data = await response.json();
      setVehicles(data.vehicles || []);
    } catch (err) {
      setError(err as Error);
      console.error("Error fetching Mazda vehicles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const refetch = async () => {
    await fetchVehicles();
  };

  return {
    vehicles,
    loading,
    error,
    refetch
  };
} 