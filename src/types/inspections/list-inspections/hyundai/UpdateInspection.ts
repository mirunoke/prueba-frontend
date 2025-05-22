export interface UpdateHyundaiInspectionPayload {
  battery_charge?: number; // 0 - 100
  front_left?: number; // PSI
  front_right?: number;
  rear_left?: number;
  rear_right?: number;
  comments?: string;
  status?: "Pendiente" | "Completado";
}
