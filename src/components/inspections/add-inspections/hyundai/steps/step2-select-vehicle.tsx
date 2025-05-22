"use client";

import React, { useEffect } from "react";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useGetHyundaiVehicles } from "@/hooks/inspections/add-inspections/hyundai/useGetHyundaiVehicles";
import Loader from "@/components/common/loader";
import { formatDate } from "@/utils/date-utils";

interface Step2Props {
  selectedVehicleId: string;
  setSelectedVehicleId: (id: string) => void;
  setVehicleDetails: (details: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step2SelectVehicle: React.FC<Step2Props> = ({
  selectedVehicleId,
  setSelectedVehicleId,
  setVehicleDetails,
  onNext,
  onBack
}) => {
  const { vehicles, loading, error } = useGetHyundaiVehicles();

  useEffect(() => {
    if (selectedVehicleId && vehicles.length > 0) {
      const selected = vehicles.find(v => v.id === selectedVehicleId);
      if (selected) {
        setVehicleDetails(selected);
      }
    }
  }, [selectedVehicleId, vehicles, setVehicleDetails]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-danger">Error al cargar vehículos: {error.message}</p>
        <Button onClick={onBack} variant="flat" className="mt-4">
          Volver
        </Button>
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Selección de vehículo
        </h2>
        
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold mb-2 text-yellow-800">No hay vehículos disponibles</h3>
          <p className="text-yellow-700">
            No se encontraron vehículos Hyundai pendientes de inspección. Todos los vehículos Hyundai ya han sido inspeccionados o no hay vehículos Hyundai registrados.
          </p>
        </div>
        
        <div className="flex justify-between mt-6">
          <Button 
            color="default" 
            variant="flat" 
            onClick={onBack}
            className="px-8"
          >
            Anterior
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        Selección de Vehículo
      </h2>
      
      <div>
        <Select
          label="Vehículo Hyundai"
          placeholder="Seleccione un vehículo"
          selectedKeys={selectedVehicleId ? [selectedVehicleId] : []}
          onChange={(e) => setSelectedVehicleId(e.target.value)}
          size="lg"
          isRequired
          className="mb-6"
        >
          {vehicles.map((vehicle) => (
            <SelectItem key={vehicle.id} value={vehicle.id}>
              {`${vehicle.year} ${vehicle.model} - ${vehicle.vin} - ${vehicle.client_name}`}
            </SelectItem>
          ))}
        </Select>
        
        {selectedVehicleId && (
          <div className="bg-gray-50 dark:bg-gray-dark dark:text-white dark:shadow-card p-4 rounded-lg border border-gray-200 mt-4">
            <h3 className="text-md font-semibold mb-2">Detalles del vehículo seleccionado</h3>
            {vehicles
              .filter(v => v.id === selectedVehicleId)
              .map(vehicle => (
                <div key={vehicle.id} className="space-y-1">
                  <p><span className="font-semibold">VIN:</span> {vehicle.vin}</p>
                  <p><span className="font-semibold">Cliente:</span> {vehicle.client_name}</p>
                  <p><span className="font-semibold">Modelo:</span> {vehicle.model} ({vehicle.year})</p>
                  <p><span className="font-semibold">Placas:</span> {vehicle.license_plate}</p>
                  <p><span className="font-semibold">Fecha de recepción:</span> {formatDate(vehicle.received_at)}</p>
                </div>
              ))
            }
          </div>
        )}
      </div>
      
      <div className="flex justify-between mt-6">
        <Button 
          color="default" 
          variant="flat" 
          onClick={onBack}
          className="px-8"
        >
          Anterior
        </Button>
        <Button 
          color="primary" 
          onClick={onNext}
          className="px-8"
          isDisabled={!selectedVehicleId}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default Step2SelectVehicle; 