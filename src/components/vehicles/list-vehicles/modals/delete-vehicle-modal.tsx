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
import { useDeleteVehicle } from "@/hooks/vehicles/list-vehicles/useDeleteVehicle";
import { Vehicle } from "@/types/vehicles/list-vehicles/Vehicle";

interface DeleteVehicleModalProps {
  vehicle: Vehicle;
  onClose: () => void;
  onDeleted: () => void;
}

const DeleteVehicleModal: React.FC<DeleteVehicleModalProps> = ({
  vehicle,
  onClose,
  onDeleted
}) => {
  const { isOpen, onOpenChange } = useDisclosure({ defaultOpen: true });
  const { deleteVehicle, loading, error, responseMessage } = useDeleteVehicle();
  const toast = useToast();

  const handleDelete = async () => {
    const success = await deleteVehicle(vehicle.id);
    if (success) {
      toast({
        title: "Vehículo eliminado",
        description: responseMessage || `El vehículo con VIN "${vehicle.vin}" se ha eliminado correctamente.`,
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
            <ModalHeader>Eliminar Vehículo</ModalHeader>
            <ModalBody>
              <p>
                ¿Estás seguro de que deseas eliminar el vehículo con VIN <strong>{vehicle.vin}</strong> del cliente <strong>{vehicle.client_name}</strong>?
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Esta acción no se puede deshacer y eliminará también todas las inspecciones asociadas.
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

export default DeleteVehicleModal; 