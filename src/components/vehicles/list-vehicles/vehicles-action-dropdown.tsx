"use client";

import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { FaEllipsisV, FaEdit, FaTrash, FaEye, FaCarSide } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Vehicle } from "@/types/vehicles/list-vehicles/Vehicle";

interface VehicleActionDropdownProps {
  vehicle: Vehicle;
  onDelete: () => void;
  onEdit: () => void;
  onViewDetails: () => void;
  onInspect?: () => void;
  onViewInspection?: () => void;
}

const VehicleActionDropdown: React.FC<VehicleActionDropdownProps> = ({
  vehicle,
  onDelete,
  onEdit,
  onViewDetails,
  onInspect,
  onViewInspection,
}) => {
  const router = useRouter();

  const handleView = () => {
    onViewDetails();
  };

  const handleEdit = () => {
    onEdit();
  };

  const handleDelete = () => {
    onDelete();
  };

  const handleInspect = () => {
    if (vehicle.status === "Completado" && onViewInspection) {
      onViewInspection();
    } else if (onInspect) {
      onInspect();
    } else {
      router.push(`/vehicles/inspect/${vehicle.id}`);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="flat">
          <FaEllipsisV />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Vehicle Actions" variant="flat">
        <DropdownItem
          key="details"
          startContent={<FaEye className="text-blue-500" />}
          onPress={handleView}
        >
          Detalles
        </DropdownItem>
        <DropdownItem
          key="edit"
          startContent={<FaEdit className="text-green-500" />}
          onPress={handleEdit}
        >
          Editar
        </DropdownItem>
        <DropdownItem
          key="inspect"
          startContent={<FaCarSide className="text-purple-500" />}
          onPress={handleInspect}
          showDivider
        >
          {vehicle.status === "Completado" 
            ? "Ver inspección" 
            : "Realizar inspección"}
        </DropdownItem>
        <DropdownItem
          key="delete"
          startContent={<FaTrash />}
          className="text-danger"
          onPress={handleDelete}
        >
          Eliminar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default VehicleActionDropdown; 