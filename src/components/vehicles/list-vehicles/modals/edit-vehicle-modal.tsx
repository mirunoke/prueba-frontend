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
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useToast } from "@chakra-ui/react";
import { Vehicle } from "@/types/vehicles/list-vehicles/Vehicle";
import { useUpdateVehicle } from "@/hooks/vehicles/list-vehicles/useUpdateVehicle";
import { FaCar, FaRegUser } from "react-icons/fa";
import { Divider } from "@heroui/react";
import { CiBarcode, CiCalendar, CiShoppingTag } from "react-icons/ci";
import { MdAbc } from "react-icons/md";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { IoChatboxEllipsesOutline, IoCarSportOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";

interface EditVehicleModalProps {
  vehicle: Vehicle;
  onClose: () => void;
  onUpdated: () => void;
}

const EditVehicleModal: React.FC<EditVehicleModalProps> = ({
  vehicle,
  onClose,
  onUpdated,
}) => {
  const [formData, setFormData] = useState<Partial<Vehicle>>({ ...vehicle });
  const { updateVehicle, loading, error } = useUpdateVehicle();
  const toast = useToast();

  const handleInputChange = (key: keyof Vehicle, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
   
      if (!formData.vin || !formData.client_name || !formData.brand ||
        !formData.model || !formData.year || !formData.license_plate ||
        !formData.client_phone || !formData.service) {
        toast({
          title: "Error",
          description: "Todos los campos son obligatorios excepto los comentarios",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      if (formData.vin.length !== 17 || !/^[A-HJ-NPR-Z0-9]{17}$/i.test(formData.vin)) {
        toast({
          title: "Error",
          description: "El VIN debe tener exactamente 17 caracteres alfanuméricos",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      if (!/^\d{10}$/.test(formData.client_phone)) {
        toast({
          title: "Error",
          description: "El teléfono debe tener exactamente 10 dígitos",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      const payload = {
        vin: formData.vin,
        client_name: formData.client_name,
        brand: formData.brand,
        model: formData.model,
        year: formData.year,
        license_plate: formData.license_plate,
        client_phone: formData.client_phone,
        service: formData.service,
        comments: formData.comments
      };

      const updatedVehicle = await updateVehicle(vehicle.id, payload);

      if (updatedVehicle) {
        toast({
          title: "Vehículo actualizado",
          description: "El vehículo ha sido actualizado correctamente",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onUpdated();
      } else {
        throw new Error(error?.message || "Error desconocido al actualizar el vehículo");
      }
    } catch (err) {
      console.error("Error actualizando vehículo:", err);
      toast({
        title: "Error",
        description: error?.message || "Error al actualizar vehículo",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} size="3xl" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Editar vehículo
        </ModalHeader>
        <ModalBody>

          <div className="flex flex-col gap-4">
            <h1 className="text-sm font-bold text-dark dark:text-white">Información del cliente</h1>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Nombre del Cliente"
                value={formData.client_name || ""}
                onChange={(e) => handleInputChange("client_name", e.target.value)}
                isRequired
                variant="bordered"
              />
              <Input
                label="Teléfono del Cliente"
                value={formData.client_phone || ""}
                onChange={(e) => handleInputChange("client_phone", e.target.value)}
                isRequired
                description="10 dígitos"
                variant="bordered"
              />
            </div>
            <Divider />

            <h1 className="text-sm font-bold text-dark dark:text-white">Información del vehículo</h1>
            <div className="grid md:grid-cols-3 gap-4">
              <Input
                label="VIN"
                value={formData.vin || ""}
                onChange={(e) => handleInputChange("vin", e.target.value)}
                isRequired
                variant="bordered"
                description="Número de identificación de 17 caracteres alfanuméricos"
              />

              <Select
                label="Marca"
                selectedKeys={new Set([formData.brand || ""])}
                onChange={(e) => handleInputChange("brand", e.target.value)}
                isRequired
                variant="bordered"
              >
                <SelectItem key="Nissan" value="Nissan">Nissan</SelectItem>
                <SelectItem key="Hyundai" value="Hyundai">Hyundai</SelectItem>
                <SelectItem key="Mazda" value="Mazda">Mazda</SelectItem>
              </Select>

              <Input
                label="Modelo"
                value={formData.model || ""}
                onChange={(e) => handleInputChange("model", e.target.value)}
                isRequired
                variant="bordered"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Input
                label="Año"
                type="number"
                min="1900"
                max={new Date().getFullYear() + 1}
                value={formData.year?.toString() || ""}
                onChange={(e) => handleInputChange("year", parseInt(e.target.value) || new Date().getFullYear())}
                isRequired
                variant="bordered"
              />

              <Input
                label="Placas"
                value={formData.license_plate || ""}
                onChange={(e) => handleInputChange("license_plate", e.target.value)}
                isRequired
                variant="bordered"
              />
            </div>
            <Divider />
            <h1 className="text-sm font-bold text-dark dark:text-white">Servicio</h1>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Servicio"
                value={formData.service || ""}
                onChange={(e) => handleInputChange("service", e.target.value)}
                isRequired
                variant="bordered"
              />

              <Input
                label="Comentarios"
                value={formData.comments || ""}
                onChange={(e) => handleInputChange("comments", e.target.value)}
                variant="bordered"
              />
            </div>


          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose} isDisabled={loading}>
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

export default EditVehicleModal; 