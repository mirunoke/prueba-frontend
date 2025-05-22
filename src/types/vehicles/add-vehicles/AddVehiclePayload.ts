export interface AddVehiclePayload {
  vin: string;
  client_name: string;
  brand: string;
  model: string;
  year: number;
  license_plate: string;
  client_phone: string;
  service: string;
  comments?: string;
}

export interface AddVehicleSuccessResponse {
  status: string;
  message: string;
  vehicle: any;
} 