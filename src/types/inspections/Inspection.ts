export interface InspectionImage {
  id: string;
  url: string;
}

export interface VehicleInfoForInspection {
  id: string;
  vin: string;
  brand: string;
  model: string;
  year: number;
  license_plate: string;
  client_name: string;
}

export interface Inspection {
  id: string;
  vehicle_id?: string;
  inspection_date: string;
  status: "pendiente" | "completado" | "Pendiente" | "Completado";
  comments?: string;
  front_lights_status?: string;
  rear_lights_status?: string;
  battery_charge?: number;
  tire_pressure?: {
    front_left?: number;
    front_right?: number;
    rear_left?: number;
    rear_right?: number;
  };
  inspection_type: string;
  images_count: number;
  images?: InspectionImage[];
  vehicle_info: VehicleInfoForInspection;
}

export interface InspectionsResponse {
  status: string;
  count: number;
  inspections: Inspection[];
} 