"use client";

import { useEffect, useState } from "react";
import { Inspection } from "@/types/inspections/Inspection";

export function useGetLastInspectionByVehicle(vehicleId: string | null) {
  const [inspection, setInspection] = useState<Inspection | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchInspection = async () => {
      if (!vehicleId) return;
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://back-prueba-qibm.onrender.com";
      setLoading(true);
      setError(null);
      try {
        const url = `${BACKEND_URL}/inspections?vehicle_id=${vehicleId}&status=Completado&limit=1`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        if (data.inspections && data.inspections.length > 0) {
          setInspection(data.inspections[0]);
        } else {
          setInspection(null);
        }
      } catch (err) {
        setError(err as Error);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInspection();
  }, [vehicleId]);

  return { inspection, loading, error };
} 