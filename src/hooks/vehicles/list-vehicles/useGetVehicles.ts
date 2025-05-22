"use client";

import { useEffect, useState, useCallback } from "react";
import { Vehicle, VehiclesResponse } from "@/types/vehicles/list-vehicles/Vehicle";
import { VehicleFilters } from "@/types/vehicles/list-vehicles/VehicleFilters";
import { UseGetVehiclesReturn } from "@/types/vehicles/list-vehicles/UseGetVehiclesReturn";

export function useGetVehicles(
  page: number,
  pageSize: number,
  filters: VehicleFilters,
  shouldFetchInitially = true
): UseGetVehiclesReturn {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [shouldFetch, setShouldFetch] = useState(shouldFetchInitially);

  const fetchVehicles = useCallback(async () => {
    if (!shouldFetch) return;
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://back-prueba-qibm.onrender.com";  

    setLoading(true);
    setError(null);

    try {
      let url = `${BACKEND_URL}/vehicles?page=${page}&limit=${pageSize}`;
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          url += `&${key}=${encodeURIComponent(value)}`;
        }
      });

      console.log("Fetching vehicles from:", url);
      
      const response = await fetch(url);

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error fetching vehicles: ${text}`);
      }

      const data = await response.json() as VehiclesResponse;
      
      setVehicles(data.vehicles || []);
      setTotalVehicles(data.count || 0);
    } catch (err) {
      setError(err as Error);
      console.error("Error fetching vehicles:", err);
    } finally {
      setLoading(false);
    }
  }, [shouldFetch, page, pageSize, filters]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const refetch = async () => {
    setShouldFetch(true);
    await fetchVehicles();
  };

  const updateLocalVehicle = (updated: Vehicle) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === updated.id ? updated : v))
    );
  };

  const removeLocalVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    setTotalVehicles((prev) => prev - 1);
  };

  return {
    vehicles,
    totalVehicles,
    loading,
    error,
    refetch,
    updateLocalVehicle,
    removeLocalVehicle,
    setShouldFetch,
  };
}
