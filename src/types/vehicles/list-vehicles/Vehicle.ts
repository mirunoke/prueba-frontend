export interface Vehicle {
  id: string;
  vin: string;
  received_at: string;
  client_name: string;
  brand: "Nissan" | "Hyundai" | "Mazda";
  model: string;
  year: number;
  license_plate: string;
  client_phone: string;
  service: string;
  comments?: string;
  status: "Pendiente" | "Completado";
  inspections_count: number;
}

export interface VehiclesResponse {
  status: string;
  count: number;
  vehicles: Vehicle[];
} 