import { Vehicle } from "./Vehicle";

export interface UseGetVehiclesReturn {
  vehicles: Vehicle[];
  totalVehicles: number;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  updateLocalVehicle: (updated: Vehicle) => void;
  removeLocalVehicle: (id: string) => void;
  setShouldFetch: (val: boolean) => void;
} 