"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Slider,
  Textarea,
} from "@nextui-org/react";
import { useToast } from "@chakra-ui/react";
import { Inspection } from "@/types/inspections/Inspection";
import { useUpdateHyundaiInspection } from "@/hooks/inspections/list-inspections/hyundai/useUpdateInspection";
import { UpdateHyundaiInspectionPayload } from "@/types/inspections/list-inspections/hyundai/UpdateInspection";

interface EditHyundaiInspectionModalProps {
  inspection: Inspection;
  onClose: () => void;
  onUpdated: () => void;
}

const statusOptions = [
  { key: "Pendiente", label: "Pendiente" },
  { key: "Completado", label: "Completado" },
];

const EditHyundaiInspectionModal: React.FC<EditHyundaiInspectionModalProps> = ({
  inspection,
  onClose,
  onUpdated,
}) => {
  const toast = useToast();
  const { updateInspection, loading, error } = useUpdateHyundaiInspection();

  const [formData, setFormData] = useState<UpdateHyundaiInspectionPayload>({
    battery_charge: inspection.battery_charge,
    front_left: inspection.tire_pressure?.front_left,
    front_right: inspection.tire_pressure?.front_right,
    rear_left: inspection.tire_pressure?.rear_left,
    rear_right: inspection.tire_pressure?.rear_right,
    comments: inspection.comments || "",
    status: inspection.status as any,
  });

  const handleChange = (key: keyof UpdateHyundaiInspectionPayload, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
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
        <ModalHeader>Editar inspección</ModalHeader>
        <ModalBody className="flex flex-col gap-4">
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


          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              label="Delantera izquierda (PSI)"
              value={formData.front_left?.toString() || ""}
              onChange={e => handleChange("front_left", parseFloat(e.target.value))}
              variant="bordered"
            />
            <Input
              type="number"
              label="Delantera derecha (PSI)"
              value={formData.front_right?.toString() || ""}
              onChange={e => handleChange("front_right", parseFloat(e.target.value))}
              variant="bordered"
            />
            <Input
              type="number"
              label="Trasera izquierda (PSI)"
              value={formData.rear_left?.toString() || ""}
              onChange={e => handleChange("rear_left", parseFloat(e.target.value))}
              variant="bordered"
            />
            <Input
              type="number"
              label="Trasera derecha (PSI)"
              value={formData.rear_right?.toString() || ""}
              onChange={e => handleChange("rear_right", parseFloat(e.target.value))}
              variant="bordered"
            />
          </div>


          <Textarea
            label="Comentarios"
            value={formData.comments}
            onValueChange={val => handleChange("comments", val)}
            variant="bordered"
          />

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

export default EditHyundaiInspectionModal;
