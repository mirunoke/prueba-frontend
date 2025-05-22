import Breadcrumb from "@/components/breadcrumbs/breadcrumb";
import AddHyundaiInspection from "@/components/inspections/add-inspections/hyundai/add-inspection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inspección Hyundai | Prueba técnica",
};

export default function AddVehiclePage() {
  return (
    <div className="p-4">
      <Breadcrumb
        backPageName="Lista de vehículos"
        backPageRoute="/vehicles/list-vehicles"
        pageName="Inspección Hyundai"
      />
      <AddHyundaiInspection />
    </div>
  );
}
