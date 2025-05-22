export interface UpdateMazdaInspectionPayload {
  front_lights_status?: "Buen_Estado" | "Cambio_Recomendado" | "Requiere_Cambio";
  rear_lights_status?: "Buen_Estado" | "Cambio_Recomendado" | "Requiere_Cambio";
  battery_charge?: number;
  comments?: string;
  status?: "Pendiente" | "Completado";
}
