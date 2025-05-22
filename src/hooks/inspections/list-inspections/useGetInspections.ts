"use client";

import { useEffect, useState, useCallback } from "react";
import { Inspection, InspectionsResponse } from "@/types/inspections/Inspection";
import { InspectionFilters } from "@/types/inspections/InspectionFilters";
import { UseGetInspectionsReturn } from "@/types/inspections/UseGetInspectionsReturn";

export function useGetInspections(
  page: number,
  pageSize: number,
  filters: InspectionFilters,
  shouldFetchInitially = true
): UseGetInspectionsReturn {
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [totalInspections, setTotalInspections] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [shouldFetch, setShouldFetch] = useState(shouldFetchInitially);

  const fetchInspections = useCallback(async () => {
    if (!shouldFetch) return;
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://back-prueba-qibm.onrender.com";

    setLoading(true);
    setError(null);

    try {
      let url = `${BACKEND_URL}/inspections?page=${page}&limit=${pageSize}`;

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          url += `&${key}=${encodeURIComponent(value)}`;
        }
      });

      console.log("Fetching inspections from:", url);
      const response = await fetch(url);
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error fetching inspections: ${text}`);
      }

      const data = (await response.json()) as InspectionsResponse;
      setInspections(data.inspections || []);
      setTotalInspections(data.count || 0);
    } catch (err) {
      setError(err as Error);
      console.error("Error fetching inspections:", err);
    } finally {
      setLoading(false);
    }
  }, [shouldFetch, page, pageSize, filters]);

  useEffect(() => {
    fetchInspections();
  }, [fetchInspections]);

  const refetch = async () => {
    setShouldFetch(true);
    await fetchInspections();
  };

  const updateLocalInspection = (updated: Inspection) => {
    setInspections(prev => prev.map(i => (i.id === updated.id ? updated : i)));
  };

  const removeLocalInspection = (id: string) => {
    setInspections(prev => prev.filter(i => i.id !== id));
    setTotalInspections(prev => prev - 1);
  };

  return {
    inspections,
    totalInspections,
    loading,
    error,
    refetch,
    updateLocalInspection,
    removeLocalInspection,
    setShouldFetch,
  };
} 