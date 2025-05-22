import { Inspection } from "./Inspection";

export interface UseGetInspectionsReturn {
  inspections: Inspection[];
  totalInspections: number;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  updateLocalInspection: (updated: Inspection) => void;
  removeLocalInspection: (id: string) => void;
  setShouldFetch: (val: boolean) => void;
} 