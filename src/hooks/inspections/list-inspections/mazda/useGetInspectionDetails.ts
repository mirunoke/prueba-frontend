"use client";

import { useEffect, useState } from "react";
import { Inspection } from "@/types/inspections/Inspection";
import { GetMazdaInspectionDetailsResponse } from "@/types/inspections/list-inspections/mazda/GetInspectionDetails";

export function useGetMazdaInspectionDetails(inspectionId: string) {
  const [inspection, setInspection] = useState<Inspection | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!inspectionId) return;
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://back-prueba-qibm.onrender.com";
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BACKEND_URL}/inspections/mazda/${inspectionId}`);
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || "Error al obtener detalles");
        }
        const data = (await response.json()) as GetMazdaInspectionDetailsResponse;
        setInspection(data.inspection);
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching inspection details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [inspectionId]);

  return { inspection, loading, error };
}
