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
} from "@nextui-org/react";
import { useToast } from "@chakra-ui/react";
import { Inspection } from "@/types/inspections/Inspection";
import { useDeleteInspection } from "@/hooks/inspections/list-inspections/useDeleteInspection";

interface DeleteInspectionModalProps {
  inspection: Inspection;
  onClose: () => void;
  onDeleted: () => void;
}

const DeleteInspectionModal: React.FC<DeleteInspectionModalProps> = ({
  inspection,
  onClose,
  onDeleted
}) => {
  const { isOpen, onOpenChange } = useDisclosure({ defaultOpen: true });
  const toast = useToast();
  const { deleteInspection, loading, error, responseMessage } = useDeleteInspection();


  const handleDelete = async () => {
    const success = await deleteInspection(inspection.id);

    if (success) {
      toast({
        title: "Inspección eliminada",
        description: responseMessage || `La inspección del vehículo VIN ${inspection.vehicle_info.vin} ha sido eliminada correctamente.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onDeleted();
    } else {
      toast({
        title: "Error al eliminar",
        description: error?.message || "Error desconocido",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <ModalContent>
        {(onModalClose) => (
          <>
            <ModalHeader>Eliminar Inspección</ModalHeader>
            <ModalBody>
              <p>
                ¿Estás seguro de que deseas eliminar la inspección del vehículo VIN <strong>{inspection.vehicle_info.vin}</strong>?
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Esta acción no se puede deshacer.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onModalClose}>
                Cancelar
              </Button>
              <Button
                color="danger"
                onPress={handleDelete}
                isDisabled={loading}
              >
                {loading ? "Eliminando..." : "Eliminar"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteInspectionModal; 