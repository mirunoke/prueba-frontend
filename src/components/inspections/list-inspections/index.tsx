"use client";

import React, { useState } from "react";
import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/date-utils";
import Loader from "@/components/common/loader";
import { useGetInspections } from "@/hooks/inspections/list-inspections/useGetInspections";
import { InspectionFilters } from "@/types/inspections/InspectionFilters";

import { Table } from "flowbite-react";
import InspectionsActionDropdown from "./inspections-action-dropdown";
import DeleteInspectionModal from "./modals/delete-inspection-modal";
import FiltersInspectionModal from "./modals/filters-inspection-modal";
import { Inspection } from "@/types/inspections/Inspection";

import EditNissanInspectionModal from "./modals/nissan/edit-inspection-modal";
import EditHyundaiInspectionModal from "./modals/hyundai/edit-inspection-modal";
import EditMazdaInspectionModal from "./modals/mazda/edit-inspection-modal";

import ViewNissanInspectionModal from "./modals/nissan/view-inspection-modal";
import ViewHyundaiInspectionModal from "./modals/hyundai/view-inspection-modal";
import ViewMazdaInspectionModal from "./modals/mazda/view-inspection-modal";
import { FaSearch } from "react-icons/fa";

const ListInspectionsTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [appliedFilters, setAppliedFilters] = useState<InspectionFilters>({});
  const [searchValue, setSearchValue] = useState("");
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  const {
    inspections,
    totalInspections,
    loading,
    error,
    refetch
  } = useGetInspections(page, pageSize, appliedFilters, true);

  const router = useRouter();

  const [inspectionToDelete, setInspectionToDelete] = useState<Inspection | null>(null);
  const [inspectionToView, setInspectionToView] = useState<Inspection | null>(null);
  const [inspectionToEdit, setInspectionToEdit] = useState<Inspection | null>(null);

  const handleSearch = () => {
    setAppliedFilters((prev) => ({
      ...prev,
      vin: searchValue,
    }));
    setPage(1);
  };
  const handleApplyFilters = (newFilters: InspectionFilters) => {
    const combinedFilters: InspectionFilters = {
      ...newFilters
    };
    if (searchValue.trim() !== "") {
      combinedFilters.vin = searchValue;
    }
    setAppliedFilters(combinedFilters);
    setPage(1);
    setShowFiltersModal(false);
  };

  const filterCount = Object.entries(appliedFilters).filter(([key, val]) => {
    if (key === "vin" && val === searchValue) return false;
    return val && val.trim() !== "";
  }).length;

  const handleDelete = (inspection: Inspection) => {
    setInspectionToDelete(inspection);
  };
  const handleViewDetails = (inspection: Inspection) => {
    setInspectionToView(inspection);
  };
  const handleCloseDeleteModal = () => {
    setInspectionToDelete(null);
  };
  const handleCloseViewModal = () => {
    setInspectionToView(null);
  };
  const handleDeleteConfirmed = () => {
    setInspectionToDelete(null);
    refetch();
  };
  const handleEdit = (inspection: Inspection) => {
    setInspectionToEdit(inspection);
  };
  const handleCloseEditModal = () => {
    setInspectionToEdit(null);
  };
  const handleEditUpdated = () => {
    setInspectionToEdit(null);
    refetch();
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <div className="flex flex-wrap md:flex-nowrap justify-between gap-3 items-end mb-4">
            <div className="flex gap-3 flex-1">
              <Input
                isClearable
                placeholder="Buscar por VIN..."
                startContent={<FaSearch />}
                value={searchValue}
                onClear={() => setSearchValue("")}
                onValueChange={setSearchValue}
              />
              <Button color="primary" onPress={handleSearch}>
                Buscar
              </Button>
            </div>
            <Dropdown backdrop="opaque">
              <DropdownTrigger>
                <Button variant="flat" className="whitespace-nowrap">
                  {pageSize} por página
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Seleccionar cantidad por página"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={new Set([String(pageSize)])}
                onSelectionChange={(key) =>
                  setPageSize(Number(Array.from(key).join("")))
                }
              >
                <DropdownItem key="15">15</DropdownItem>
                <DropdownItem key="30">30</DropdownItem>
                <DropdownItem key="60">60</DropdownItem>
                <DropdownItem key="120">120</DropdownItem>
                <DropdownItem key="240">240</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <div className="flex gap-3">
              <Button
                variant="flat"
                color={filterCount > 0 ? "success" : "default"}
                onPress={() => setShowFiltersModal(true)}
              >
                {filterCount > 0 ? `${filterCount} filtros` : "Filtros"}
              </Button>
            </div>
          </div>
        </div>
        <div className="p-6.5">
          {loading ? (
            <Loader />
          ) : error ? (
            <div className="text-center text-red-500">
              Error: {error.message}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto h-auto overflow-scroll rounded-md">
                <Table hoverable className="[&_td]:px-2 [&_td]:py-1 [&_th]:px-2 [&_th]:py-3 text-xs">
                  <Table.Head className="sticky top-0 z-20">
                    <Table.HeadCell>Fecha</Table.HeadCell>
                    <Table.HeadCell>VIN</Table.HeadCell>
                    <Table.HeadCell>Marca</Table.HeadCell>
                    <Table.HeadCell>Modelo</Table.HeadCell>
                    <Table.HeadCell>Año</Table.HeadCell>
                    <Table.HeadCell>Cliente</Table.HeadCell>
                    <Table.HeadCell>Tipo</Table.HeadCell>
                    <Table.HeadCell>Imágenes</Table.HeadCell>
                    <Table.HeadCell>Estado</Table.HeadCell>
                    <Table.HeadCell>Acciones</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {inspections.map((inspection) => (
                      <Table.Row key={inspection.id} className="bg-white dark:border-dark-3 dark:bg-gray-dark">
                        <Table.Cell>{formatDate(inspection.inspection_date)}</Table.Cell>
                        <Table.Cell>{inspection.vehicle_info.vin}</Table.Cell>
                        <Table.Cell>{inspection.vehicle_info.brand}</Table.Cell>
                        <Table.Cell>{inspection.vehicle_info.model}</Table.Cell>
                        <Table.Cell>{inspection.vehicle_info.year}</Table.Cell>
                        <Table.Cell>{inspection.vehicle_info.client_name}</Table.Cell>
                        <Table.Cell>{inspection.inspection_type}</Table.Cell>
                        <Table.Cell>{inspection.images_count}</Table.Cell>
                        <Table.Cell>
                          <Tooltip content={inspection.status}>
                            <Chip
                              size="sm"
                              color={inspection.status === "Completado" ? "success" : "danger"}
                            >
                              {inspection.status}
                            </Chip>
                          </Tooltip>
                        </Table.Cell>
                        <Table.Cell>
                          <InspectionsActionDropdown
                            inspection={inspection}
                            onDelete={() => handleDelete(inspection)}
                            onViewDetails={() => handleViewDetails(inspection)}
                            onEdit={() => handleEdit(inspection)}
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
              <div className="py-4 flex justify-between items-center">
                <span className="text-sm text-default-400">
                  Total {totalInspections} inspecciones
                </span>
                <Pagination
                  page={page}
                  total={Math.ceil(totalInspections / pageSize)}
                  onChange={setPage}
                  showControls
                />
              </div>
            </>
          )}
        </div>
      </div>
      {showFiltersModal && (
        <FiltersInspectionModal
          initialFilters={appliedFilters}
          onClose={() => setShowFiltersModal(false)}
          onApply={handleApplyFilters}
        />
      )}
      {inspectionToDelete && (
        <DeleteInspectionModal
          inspection={inspectionToDelete}
          onClose={handleCloseDeleteModal}
          onDeleted={handleDeleteConfirmed}
        />
      )}
      {inspectionToView && inspectionToView.vehicle_info.brand === "Nissan" && (
        <ViewNissanInspectionModal
          inspection={inspectionToView}
          onClose={handleCloseViewModal}
        />
      )}

      {inspectionToView && inspectionToView.vehicle_info.brand === "Hyundai" && (
        <ViewHyundaiInspectionModal
          inspection={inspectionToView}
          onClose={handleCloseViewModal}
        />
      )}

      {inspectionToView && inspectionToView.vehicle_info.brand === "Mazda" && (
        <ViewMazdaInspectionModal
          inspection={inspectionToView}
          onClose={handleCloseViewModal}
        />
      )}

      {inspectionToEdit && inspectionToEdit.vehicle_info.brand === "Nissan" && (
        <EditNissanInspectionModal
          inspection={inspectionToEdit}
          onClose={handleCloseEditModal}
          onUpdated={handleEditUpdated}
        />
      )}

      {inspectionToEdit && inspectionToEdit.vehicle_info.brand === "Hyundai" && (
        <EditHyundaiInspectionModal
          inspection={inspectionToEdit}
          onClose={handleCloseEditModal}
          onUpdated={handleEditUpdated}
        />
      )}

      {inspectionToEdit && inspectionToEdit.vehicle_info.brand === "Mazda" && (
        <EditMazdaInspectionModal
          inspection={inspectionToEdit}
          onClose={handleCloseEditModal}
          onUpdated={handleEditUpdated}
        />
      )}
    </div>
  );
};

export default ListInspectionsTable; 