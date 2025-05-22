"use client";

import React, { useState, useEffect } from "react";
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
import { useToast } from "@chakra-ui/react";
import { FaPlus, FaSearch, FaFilter, FaCar } from "react-icons/fa";
import Loader from "@/components/common/loader";
import { Vehicle } from "@/types/vehicles/list-vehicles/Vehicle";
import { useGetVehicles } from "@/hooks/vehicles/list-vehicles/useGetVehicles";
import { VehicleFilters } from "@/types/vehicles/list-vehicles/VehicleFilters";
import { formatDate } from "@/utils/date-utils";
import { SiNissan, SiHyundai, SiMazda } from "react-icons/si";
import VehicleActionDropdown from "./vehicles-action-dropdown";
import FiltersVehicleModal from "./modals/filters-vehicle-modal";
import DeleteVehicleModal from "./modals/delete-vehicle-modal";
import EditVehicleModal from "./modals/edit-vehicle-modal";
import ViewVehicleModal from "./modals/view-vehicle-modal";
import ViewNissanInspectionModal from "@/components/inspections/list-inspections/modals/nissan/view-inspection-modal";
import ViewHyundaiInspectionModal from "@/components/inspections/list-inspections/modals/hyundai/view-inspection-modal";
import ViewMazdaInspectionModal from "@/components/inspections/list-inspections/modals/mazda/view-inspection-modal";
import { Inspection } from "@/types/inspections/Inspection";

import { Table } from "flowbite-react";

const brandIcons: Record<string, JSX.Element> = {
  nissan: <SiNissan className="font-bold text-xl align-middle" />,
  mazda: <SiMazda className="font-bold text-xl align-middle" />,
  hyundai: <SiHyundai className="font-bold text-xl align-middle" />,
  default: <FaCar className="text-xl text-gray-400" />,
};

const ListVehiclesTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [appliedFilters, setAppliedFilters] = useState<VehicleFilters>({});
  const [searchValue, setSearchValue] = useState("");
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [inspectionDetail, setInspectionDetail] = useState<Inspection | null>(null);

  const {
    vehicles,
    totalVehicles,
    loading,
    error,
    refetch
  } = useGetVehicles(page, pageSize, appliedFilters, true);
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);
  const [vehicleToEdit, setVehicleToEdit] = useState<Vehicle | null>(null);
  const [vehicleToView, setVehicleToView] = useState<Vehicle | null>(null);

  const toast = useToast();
  const router = useRouter();

  const handleSearch = () => {
    setAppliedFilters((prev) => ({
      ...prev,
      vin: searchValue,
    }));
    setPage(1);
  };

  const handleApplyFilters = (newFilters: VehicleFilters) => {
    const combinedFilters: VehicleFilters = {
      ...newFilters
    };

    if (searchValue.trim() !== "") {
      combinedFilters.vin = searchValue;
    }

    console.log("Filtros combinados:", combinedFilters);
    setAppliedFilters(combinedFilters);
    setPage(1);
    setShowFiltersModal(false);
  };

  const filterCount = Object.entries(appliedFilters).filter(([key, val]) => {
    if (key === "vin" && val === searchValue) return false; 
    return val && val.trim() !== "";
  }).length;

  const handleGoToAddVehicle = () => {
    router.push("/vehicles/add");
  };

  const handleDelete = (vehicle: Vehicle) => {
    setVehicleToDelete(vehicle);
  };

  const handleEdit = (vehicle: Vehicle) => {
    setVehicleToEdit(vehicle);
  };

  const handleViewDetails = (vehicle: Vehicle) => {
    setVehicleToView(vehicle);
  };

  const handleInspect = (vehicle: Vehicle) => {
    const brandPath = vehicle.brand.toLowerCase();
    router.push(`/inspections/${brandPath}/add-inspection?vehicleId=${vehicle.id}`);
  };

  const handleViewInspection = (vehicle: Vehicle) => {
    fetchLastInspection(vehicle.id);
  };

  const handleCloseDeleteModal = () => {
    setVehicleToDelete(null);
  };

  const handleCloseEditModal = () => {
    setVehicleToEdit(null);
  };

  const handleCloseViewModal = () => {
    setVehicleToView(null);
  };

  const handleDeleteConfirmed = () => {
    setVehicleToDelete(null);

    refetch();
  };

  const handleEditUpdated = () => {
    setVehicleToEdit(null);
    refetch();
  };

  const fetchLastInspection = async (vehicleId: string) => {
    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://back-prueba-qibm.onrender.com";
      const url = `${BACKEND_URL}/inspections?vehicle_id=${vehicleId}&status=Completado&limit=1`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      if (data.inspections && data.inspections.length > 0) {
        setInspectionDetail(data.inspections[0] as any);
      } else {
        toast({ title: "Sin inspección", description: "El vehículo aún no tiene inspecciones completadas", status: "info", duration: 4000, isClosable: true });
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "No se pudo obtener la inspección", status: "error", duration: 4000, isClosable: true });
    }
  };

  const handleCloseInspectionModal = () => {
    setInspectionDetail(null);
  };

  return (
    <div className="flex flex-col gap-9">
      <div
        className="rounded-[10px] border border-stroke bg-white shadow-1
                   dark:border-dark-3 dark:bg-gray-dark dark:shadow-card"
      >

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
                startContent={<FaFilter />}
                onPress={() => setShowFiltersModal(true)}
              >
                {filterCount > 0 ? `${filterCount} filtros` : "Filtros"}
              </Button>

              <Button
                onClick={handleGoToAddVehicle}
                color="primary"
                startContent={<FaPlus />}
              >
                Añadir Vehículo
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
                    <Table.HeadCell>Marca</Table.HeadCell>
                    <Table.HeadCell>VIN</Table.HeadCell>
                    <Table.HeadCell>Modelo</Table.HeadCell>
                    <Table.HeadCell>Año</Table.HeadCell>
                    <Table.HeadCell>Cliente</Table.HeadCell>
                    <Table.HeadCell>Fecha Recepción</Table.HeadCell>
                    <Table.HeadCell>Estado</Table.HeadCell>
                    <Table.HeadCell>Acciones</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {vehicles.map((vehicle) => (
                      <Table.Row
                        key={vehicle.id}
                        className="bg-white dark:border-dark-3 dark:bg-gray-dark"
                      >
                        <Table.Cell className="text-xs max-w-[110px] inline-flex items-center gap-1">
                          {brandIcons[vehicle.brand.toLowerCase()] || brandIcons.default}
                          {vehicle.brand}
                        </Table.Cell>                        
                        <Table.Cell className="whitespace-nowrap text-xs font-medium">
                          {vehicle.vin}
                        </Table.Cell>
                        <Table.Cell className="text-xs max-w-[110px]">
                          {vehicle.model}
                        </Table.Cell>
                        <Table.Cell className="text-xs max-w-[110px]">
                          {vehicle.year}
                        </Table.Cell>
                        <Table.Cell className="text-xs max-w-[110px]">
                          {vehicle.client_name}
                        </Table.Cell>
                        <Table.Cell className="text-xs max-w-[110px]">
                          {formatDate(vehicle.received_at)}
                        </Table.Cell>
                        <Table.Cell className="truncate max-w-[110px]">
                          <Tooltip content={vehicle.status}>
                            <Chip
                              size="sm"
                              color={vehicle.status === "Completado" ? "success" : "danger"}
                            >
                              {vehicle.status}
                            </Chip>
                          </Tooltip>
                        </Table.Cell>
                        <Table.Cell>
                          <VehicleActionDropdown
                            vehicle={vehicle}
                            onDelete={() => handleDelete(vehicle)}
                            onEdit={() => handleEdit(vehicle)}
                            onViewDetails={() => handleViewDetails(vehicle)}
                            onInspect={() => handleInspect(vehicle)}
                            onViewInspection={() => handleViewInspection(vehicle)}
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>

              <div className="py-4 flex justify-between items-center">
                <span className="text-sm text-default-400">
                  Total {totalVehicles} vehículos
                </span>
                <Pagination
                  page={page}
                  total={Math.ceil(totalVehicles / pageSize)}
                  onChange={setPage}
                  showControls
                />
              </div>
            </>
          )}
        </div>
      </div>


      {showFiltersModal && (
        <FiltersVehicleModal
          initialFilters={appliedFilters}
          onClose={() => setShowFiltersModal(false)}
          onApply={handleApplyFilters}
        />
      )}


      {vehicleToDelete && (
        <DeleteVehicleModal
          vehicle={vehicleToDelete}
          onClose={handleCloseDeleteModal}
          onDeleted={handleDeleteConfirmed}
        />
      )}

      {vehicleToEdit && (
        <EditVehicleModal
          vehicle={vehicleToEdit}
          onClose={handleCloseEditModal}
          onUpdated={handleEditUpdated}
        />
      )}


      {vehicleToView && (
        <ViewVehicleModal
          vehicle={vehicleToView}
          onClose={handleCloseViewModal}
          onInspect={() => {
            handleCloseViewModal();
            handleInspect(vehicleToView);
          }}
        />
      )}

      {inspectionDetail && ((inspectionDetail as any).vehicle?.brand ?? inspectionDetail.vehicle_info?.brand) === "Nissan" && (
        <ViewNissanInspectionModal inspection={inspectionDetail as any} onClose={handleCloseInspectionModal} />
      )}

      {inspectionDetail && ((inspectionDetail as any).vehicle?.brand ?? inspectionDetail.vehicle_info?.brand) === "Hyundai" && (
        <ViewHyundaiInspectionModal inspection={inspectionDetail as any} onClose={handleCloseInspectionModal} />
      )}

      {inspectionDetail && ((inspectionDetail as any).vehicle?.brand ?? inspectionDetail.vehicle_info?.brand) === "Mazda" && (
        <ViewMazdaInspectionModal inspection={inspectionDetail as any} onClose={handleCloseInspectionModal} />
      )}
    </div>
  );
};

export default ListVehiclesTable; 