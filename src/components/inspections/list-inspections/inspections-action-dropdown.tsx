"use client";

import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { FaEllipsisV, FaEye, FaTrash, FaEdit } from "react-icons/fa";
import { Inspection } from "@/types/inspections/Inspection";
import { useToast } from "@chakra-ui/react";

interface InspectionsActionDropdownProps {
  inspection: Inspection;
  onDelete: () => void;
  onViewDetails: () => void;
  onEdit?: () => void;
}

const InspectionsActionDropdown: React.FC<InspectionsActionDropdownProps> = ({
  inspection,
  onDelete,
  onViewDetails,
  onEdit,
}) => {
  const [fetchedInspection, setFetchedInspection] = useState<Inspection | null>(null);
  const [fetchVehicleId, setFetchVehicleId] = useState<string | null>(null);
  const [fetchingInspection, setFetchingInspection] = useState(false);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const toast = useToast();
  useEffect(() => {
    if (fetchedInspection) {
      setFetchedInspection(fetchedInspection as any);
      setFetchVehicleId(null);         
    } else if (fetchVehicleId && !fetchingInspection && !fetchedInspection) {
      if (!fetchError) {
        toast({
          title: "Sin inspección",
          description: "El vehículo aún no tiene inspecciones completadas",
          status: "info",
          duration: 4000,
          isClosable: true,
        });
      }
      setFetchVehicleId(null);     
    }
  }, [fetchedInspection, fetchVehicleId, fetchingInspection]);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="flat">
          <FaEllipsisV />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Inspections Actions" variant="flat">
        <DropdownItem
          key="details"
          startContent={<FaEye className="text-blue-500" />}
          onPress={onViewDetails}
        >
          Ver detalles
        </DropdownItem>
        {onEdit ? (
          <DropdownItem
            key="edit"
            startContent={<FaEdit className="text-green-500" />}
            onPress={onEdit}
          >
            Editar
          </DropdownItem>
        ) : <></>}
        <DropdownItem
          key="delete"
          startContent={<FaTrash />}
          className="text-danger"
          onPress={onDelete}
        >
          Eliminar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default InspectionsActionDropdown; 