"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
  Slider,
  Textarea,
} from "@nextui-org/react";
import { useToast } from "@chakra-ui/react";
import { Inspection } from "@/types/inspections/Inspection";
import { useUpdateMazdaInspection } from "@/hooks/inspections/list-inspections/mazda/useUpdateInspection";
import { UpdateMazdaInspectionPayload } from "@/types/inspections/list-inspections/mazda/UpdateInspection";

interface EditMazdaInspectionModalProps {
  inspection: Inspection;
  onClose: () => void;
  onUpdated: () => void;
}

const lightOptions = [
  { key: "Buen_Estado", label: "Buen Estado" },
  { key: "Cambio_Recomendado", label: "Cambio Recomendado" },
  { key: "Requiere_Cambio", label: "Requiere Cambio" },
];
const statusOptions = [
  { key: "Pendiente", label: "Pendiente" },
  { key: "Completado", label: "Completado" },
];

const EditMazdaInspectionModal: React.FC<EditMazdaInspectionModalProps> = ({
  inspection,
  onClose,
  onUpdated,
}) => {
  const toast = useToast();
  const { updateInspection, loading, error } = useUpdateMazdaInspection();

  const [formData, setFormData] = useState<UpdateMazdaInspectionPayload>({
    front_lights_status: inspection.front_lights_status as any,
    rear_lights_status: inspection.rear_lights_status as any,
    battery_charge: inspection.battery_charge,
    comments: inspection.comments || "",
    status: inspection.status as any,
  });

  const handleChange = (key: keyof UpdateMazdaInspectionPayload, val: any) => {
    setFormData(prev => ({ ...prev, [key]: val }));
  };

  const handleSubmit = async () => {
    if (formData.battery_charge !== undefined && (formData.battery_charge < 0 || formData.battery_charge > 100)) {
      toast({
        title: "Error",
        description: "La carga de batería debe ser entre 0 y 100",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    const updated = await updateInspection(inspection.id, formData);
    if (updated) {
      toast({
        title: "Inspección actualizada",
        description: "Los datos han sido guardados correctamente",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      onUpdated();
    } else if (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} size="lg" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader>Editar inspección </ModalHeader>
        <ModalBody className="flex flex-col gap-4">

          <Select
            label="Estado de Luces Frontales"
            selectedKeys={new Set([formData.front_lights_status || ""])}
            onSelectionChange={keys => handleChange("front_lights_status", Array.from(keys)[0] as any)}
            variant="bordered"
          >
            {lightOptions.map(opt => (
              <SelectItem key={opt.key}>{opt.label}</SelectItem>
            ))}
          </Select>

          <Select
            label="Estado de Luces Posteriores"
            selectedKeys={new Set([formData.rear_lights_status || ""])}
            onSelectionChange={keys => handleChange("rear_lights_status", Array.from(keys)[0] as any)}
            variant="bordered"
          >
            {lightOptions.map(opt => (
              <SelectItem key={opt.key}>{opt.label}</SelectItem>
            ))}
          </Select>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Nivel de carga de batería: {formData.battery_charge ?? 0}%</span>
            <Slider
              size="sm"
              color="primary"
              step={1}
              maxValue={100}
              minValue={0}
              aria-label="battery-charge"
              defaultValue={formData.battery_charge ?? 0}
              onChangeEnd={val => handleChange("battery_charge", Array.isArray(val) ? val[0] : val)}
            />
          </div>

          <Textarea
            label="Comentarios"
            value={formData.comments}
            onValueChange={val => handleChange("comments", val)}
            variant="bordered"
          />

          <Select
            label="Estado"
            selectedKeys={new Set([formData.status || ""])}
            onSelectionChange={keys => handleChange("status", Array.from(keys)[0] as any)}
            variant="bordered"
          >
            {statusOptions.map(opt => (
              <SelectItem key={opt.key}>{opt.label}</SelectItem>
            ))}
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={onClose} isDisabled={loading}>
            Cancelar
          </Button>
          <Button color="primary" onPress={handleSubmit} isLoading={loading}>
            Guardar cambios
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditMazdaInspectionModal;
