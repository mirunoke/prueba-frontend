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
import { InspectionFilters } from "@/types/inspections/InspectionFilters";

interface FiltersInspectionModalProps {
  initialFilters: InspectionFilters;
  onClose: () => void;
  onApply: (newFilters: InspectionFilters) => void;
  defaultOpen?: boolean;
}

const FiltersInspectionModal: React.FC<FiltersInspectionModalProps> = ({
  initialFilters,
  onClose,
  onApply,
  defaultOpen = true,
}) => {
  const { isOpen, onOpenChange } = useDisclosure({ defaultOpen });
  const [pendingFilters, setPendingFilters] = useState<InspectionFilters>(initialFilters);

  const handleChange = (field: keyof InspectionFilters, value: string) => {
    setPendingFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    const filteredValues: InspectionFilters = {};
    Object.entries(pendingFilters).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        filteredValues[key as keyof InspectionFilters] = value;
      }
    });
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
            <ModalHeader>Filtros de Inspección</ModalHeader>
            <ModalBody className="grid grid-cols-2 gap-4">
              <Input
                label="VIN"
                placeholder="Ingrese VIN"
                value={pendingFilters.vin || ""}
                onValueChange={(value) => handleChange("vin", value)}
              />
              <Input
                label="Placas"
                placeholder="Ingrese placas"
                value={pendingFilters.license_plate || ""}
                onValueChange={(value) => handleChange("license_plate", value)}
              />
              <Select
                label="Marca"
                placeholder="Seleccione marca"
                selectedKeys={pendingFilters.vehicle_brand ? new Set([pendingFilters.vehicle_brand]) : new Set()}
                onSelectionChange={(keys) => {
                  const keyArray = Array.from(keys);
                  handleChange("vehicle_brand", keyArray.length > 0 ? keyArray[0].toString() : "");
                }}
              >
                <SelectItem key="Nissan" value="Nissan">Nissan</SelectItem>
                <SelectItem key="Hyundai" value="Hyundai">Hyundai</SelectItem>
                <SelectItem key="Mazda" value="Mazda">Mazda</SelectItem>
              </Select>
              <Select
                label="Estado"
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
              <Input
                label="Fecha desde"
                type="date"
                value={pendingFilters.date_from || ""}
                onValueChange={(value) => handleChange("date_from", value)}
              />
              <Input
                label="Fecha hasta"
                type="date"
                value={pendingFilters.date_to || ""}
                onValueChange={(value) => handleChange("date_to", value)}
              />
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

export default FiltersInspectionModal; 