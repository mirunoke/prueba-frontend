export interface UpdateNissanInspectionPayload {
  front_lights_status?: "Buen_Estado" | "Cambio_Recomendado" | "Requiere_Cambio";
  rear_lights_status?: "Buen_Estado" | "Cambio_Recomendado" | "Requiere_Cambio";
  comments?: string;
  status?: "Pendiente" | "Completado";
}
