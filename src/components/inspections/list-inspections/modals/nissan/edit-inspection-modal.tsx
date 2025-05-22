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
  Textarea,
} from "@nextui-org/react";
import { useToast } from "@chakra-ui/react";
import { Inspection } from "@/types/inspections/Inspection";
import { useUpdateNissanInspection } from "@/hooks/inspections/list-inspections/nissan/useUpdateInspection";
import { UpdateNissanInspectionPayload } from "@/types/inspections/list-inspections/nissan/UpdateInspection";

interface EditNissanInspectionModalProps {
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

const EditNissanInspectionModal: React.FC<EditNissanInspectionModalProps> = ({
  inspection,
  onClose,
  onUpdated,
}) => {
  const toast = useToast();
  const { updateInspection, loading, error } = useUpdateNissanInspection();

  const [formData, setFormData] = useState<UpdateNissanInspectionPayload>({
    front_lights_status: inspection.front_lights_status as any,
    rear_lights_status: inspection.rear_lights_status as any,
    comments: inspection.comments || "",
    status: inspection.status as any,
  });

  const handleChange = (key: keyof UpdateNissanInspectionPayload, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {

    if (!formData.front_lights_status || !formData.rear_lights_status) {
      toast({
        title: "Error",
        description: "El estado de luces frontales y posteriores es obligatorio",
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
          <Select
            label="Estado de Luces Frontales"
            selectedKeys={new Set([formData.front_lights_status || ""])}
            onSelectionChange={keys => {
              const val = Array.from(keys)[0] as string;
              handleChange("front_lights_status", val as any);
            }}
            isRequired
            variant="bordered"
          >
            {lightOptions.map(opt => (
              <SelectItem key={opt.key}>{opt.label}</SelectItem>
            ))}
          </Select>

          <Select
            label="Estado de Luces Posteriores"
            selectedKeys={new Set([formData.rear_lights_status || ""])}
            onSelectionChange={keys => {
              const val = Array.from(keys)[0] as string;
              handleChange("rear_lights_status", val as any);
            }}
            isRequired
            variant="bordered"
          >
            {lightOptions.map(opt => (
              <SelectItem key={opt.key}>{opt.label}</SelectItem>
            ))}
          </Select>

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

export default EditNissanInspectionModal;
