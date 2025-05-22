import Breadcrumb from "@/components/breadcrumbs/breadcrumb";
import ListVehiclesTable from "@/components/vehicles/list-vehicles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lista de vehículos | Prueba técnica",
};

export default function AddVehiclePage() {
  return (
    <div className="p-4">
      <Breadcrumb
        backPageName="Inicio"
        backPageRoute="/"
        pageName="Lista de vehículos"
      />
      <ListVehiclesTable />
    </div>
  );
}
