import Breadcrumb from "@/components/breadcrumbs/breadcrumb";
import AddMazdaInspection from "@/components/inspections/add-inspections/mazda/add-inspection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inspección Mazda | Prueba técnica",
};

export default function AddVehiclePage() {
  return (
    <div className="p-4">
      <Breadcrumb
        backPageName="Lista de vehículos"
        backPageRoute="/vehicles/list-vehicles"
        pageName="Inspección Mazda"
      />
      <AddMazdaInspection />
    </div>
  );
}
