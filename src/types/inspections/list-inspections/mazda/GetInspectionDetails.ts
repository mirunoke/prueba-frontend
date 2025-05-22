import { Inspection } from "@/types/inspections/Inspection";

export interface GetMazdaInspectionDetailsResponse {
  status: string;
  inspection: Inspection;
}
