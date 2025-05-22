"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Chip,
} from "@nextui-org/react";
import { Vehicle } from "@/types/vehicles/list-vehicles/Vehicle";
import { formatDate } from "@/utils/date-utils";

interface ViewVehicleModalProps {
  vehicle: Vehicle;
  onClose: () => void;
  onInspect?: () => void;
}

const ViewVehicleModal: React.FC<ViewVehicleModalProps> = ({
  vehicle,
  onClose,
  onInspect,
}) => {
  const { isOpen, onOpenChange } = useDisclosure({ defaultOpen: true });

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={(open) => !open && onClose()} 
      size="2xl"
    >
      <ModalContent>
        {(onModalClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Detalles del vehículo
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="col-span-2 bg-gray-100 p-3 rounded-lg">
                  <h3 className="text-xl font-bold mb-1">{vehicle.brand} {vehicle.model} ({vehicle.year})</h3>
                  <div className="flex items-center gap-2">
                    <Chip
                      color={vehicle.status === "Completado" ? "success" : "danger"}
                      variant="flat"
                    >
                      {vehicle.status}
                    </Chip>
                    <span className="text-sm text-gray-500">
                      Recibido: {formatDate(vehicle.received_at)}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-500">Cliente</span>
                  <span className="font-semibold">{vehicle.client_name}</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-500">Teléfono</span>
                  <span className="font-semibold">{vehicle.client_phone}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-500">VIN</span>
                  <span className="font-semibold">{vehicle.vin}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-500">Placas</span>
                  <span className="font-semibold">{vehicle.license_plate}</span>
                </div>
                
                <div className="col-span-2 flex flex-col gap-1">
                  <span className="text-sm text-gray-500">Servicio</span>
                  <span className="font-semibold">{vehicle.service}</span>
                </div>
                
                <div className="col-span-2 flex flex-col gap-1">
                  <span className="text-sm text-gray-500">Comentarios</span>
                  <span className="font-semibold">{vehicle.comments || "No hay comentarios"}</span>
                </div>
                
                <div className="col-span-2 flex flex-col gap-1 mt-2">
                  <span className="text-sm text-gray-500">Estado de Inspección</span>
                  <div className="flex items-center gap-2">
                    <Chip
                      color={vehicle.status === "Completado" ? "success" : "danger"}
                      variant="flat"
                      size="lg"
                    >
                      {vehicle.status}
                    </Chip>
                    <span className="text-sm">
                      {vehicle.status === "Completado"
                        ? `Inspección completada (${vehicle.inspections_count} inspección(es))`
                        : "Pendiente de inspección"}
                    </span>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onModalClose}>
                Cerrar
              </Button>
              {onInspect && (
                <Button 
                  color="primary" 
                  onPress={() => {
                    onModalClose();
                    onInspect();
                  }}
                >
                  {vehicle.status === "Completado" 
                    ? "Ver inspección" 
                    : "Realizar inspección"}
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ViewVehicleModal; 