import Breadcrumb from "@/components/breadcrumbs/breadcrumb";
import AddVehicleForm from "@/components/vehicles/add-vehicles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agregar vehículo | Prueba técnica",
};

export default function AddVehiclePage() {
  return (
    <div className="p-4">
      <Breadcrumb
        backPageName="Lista de vehículos"
        backPageRoute="/vehicles/list-vehicles"
        pageName="Agregar vehiculo"
      />
      <AddVehicleForm />
    </div>
  );
}
