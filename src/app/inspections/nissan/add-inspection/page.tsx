import Breadcrumb from "@/components/breadcrumbs/breadcrumb";
import AddNissanInspection from "@/components/inspections/add-inspections/nissan/add-inspection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inspección Nissan | Prueba técnica",
};

export default function AddVehiclePage() {
  return (
    <div className="p-4">
      <Breadcrumb
        backPageName="Lista de vehículos"
        backPageRoute="/vehicles/list-vehicles"
        pageName="Inspección Nissan"
      />
      <AddNissanInspection />
    </div>
  );
}
