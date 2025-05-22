import Breadcrumb from "@/components/breadcrumbs/breadcrumb";
import ListInspectionsTable from "@/components/inspections/list-inspections";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inspecciones | Prueba técnica",
};

export default function AddVehiclePage() {
  return (
    <div className="p-4">
      <Breadcrumb
        backPageName="Inspecciones"
        backPageRoute="/inspections/list-inspections"
        pageName="Inspecciones"
      />
      <ListInspectionsTable />
    </div>
  );
}
