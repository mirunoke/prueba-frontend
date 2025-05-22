"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
  Input,
} from "@nextui-org/react";
import { VehicleFilters } from "@/types/vehicles/list-vehicles/VehicleFilters";

interface FiltersVehicleModalProps {
  initialFilters: VehicleFilters;
  onClose: () => void;
  onApply: (newFilters: VehicleFilters) => void;
  defaultOpen?: boolean;
}

const FiltersVehicleModal: React.FC<FiltersVehicleModalProps> = ({
  initialFilters,
  onClose,
  onApply,
  defaultOpen = true,
}) => {
  const { isOpen, onOpenChange } = useDisclosure({ defaultOpen });

  const [pendingFilters, setPendingFilters] = useState<VehicleFilters>(initialFilters);

  const handleChange = (field: keyof VehicleFilters, value: string) => {
    setPendingFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    const filteredValues: VehicleFilters = {};
    
    Object.entries(pendingFilters).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        filteredValues[key as keyof VehicleFilters] = value;
      }
    });
    
    console.log("Aplicando filtros:", filteredValues);
    onApply(filteredValues);
  };

  return (
    <Modal
      isOpen={isOpen}
      placement="auto"
      size="3xl"
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <ModalContent>
        {(onModalClose) => (
          <>
            <ModalHeader>Filtros Avanzados</ModalHeader>
            <ModalBody className="grid grid-cols-2 gap-4">
             
              <Input
                label="VIN"
                placeholder="Ingrese VIN"
                value={pendingFilters.vin || ""}
                onValueChange={(value) => handleChange("vin", value)}
              />

              
              <Input
                label="Nombre del Cliente"
                placeholder="Ingrese nombre del cliente"
                value={pendingFilters.client_name || ""}
                onValueChange={(value) => handleChange("client_name", value)}
              />

              
              <Select
                label="Marca"
                placeholder="Seleccione marca"
                selectedKeys={pendingFilters.brand ? new Set([pendingFilters.brand]) : new Set()}
                onSelectionChange={(keys) => {
                  const keyArray = Array.from(keys);
                  handleChange("brand", keyArray.length > 0 ? keyArray[0].toString() : "");
                }}
              >
                <SelectItem key="Nissan" value="Nissan">Nissan</SelectItem>
                <SelectItem key="Hyundai" value="Hyundai">Hyundai</SelectItem>
                <SelectItem key="Mazda" value="Mazda">Mazda</SelectItem>
              </Select>

              
              <Input
                label="Modelo"
                placeholder="Ingrese modelo"
                value={pendingFilters.model || ""}
                onValueChange={(value) => handleChange("model", value)}
              />

              
              <Input
                label="Año"
                placeholder="Ingrese año"
                value={pendingFilters.year || ""}
                onValueChange={(value) => handleChange("year", value)}
              />

              
              <Input
                label="Placas"
                placeholder="Ingrese placas"
                value={pendingFilters.license_plate || ""}
                onValueChange={(value) => handleChange("license_plate", value)}
              />

             
              <Input
                label="Teléfono del Cliente"
                placeholder="Ingrese teléfono"
                value={pendingFilters.client_phone || ""}
                onValueChange={(value) => handleChange("client_phone", value)}
              />

              
              <Input
                label="Servicio"
                placeholder="Ingrese servicio"
                value={pendingFilters.service || ""}
                onValueChange={(value) => handleChange("service", value)}
              />

              
              <Select
                label="Estado de Inspección"
                placeholder="Seleccione estado"
                selectedKeys={pendingFilters.status ? new Set([pendingFilters.status]) : new Set()}
                onSelectionChange={(keys) => {
                  const keyArray = Array.from(keys);
                  handleChange("status", keyArray.length > 0 ? keyArray[0].toString() : "");
                }}
              >
                <SelectItem key="pendiente" value="pendiente">Pendiente</SelectItem>
                <SelectItem key="completado" value="completado">Completado</SelectItem>
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onModalClose}>
                Cancelar
              </Button>
              <Button color="primary" onPress={handleApply}>
                Aplicar Filtros
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default FiltersVehicleModal; 