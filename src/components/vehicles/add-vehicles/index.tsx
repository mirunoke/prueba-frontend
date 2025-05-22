"use client";
import React, { useState } from "react";
import {
  Input,
  Select,
  SelectItem,
  Spinner
} from "@nextui-org/react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import SuccessModal from "@/components/vehicles/add-vehicles/modals/success-modal";
import { useAddVehicles } from "@/hooks/vehicles/add-vehicles/useAddVehicles";
import { AddVehiclePayload } from "@/types/vehicles/add-vehicles/AddVehiclePayload";
import Loader from "@/components/common/loader";
import { FaCar, FaRegUser } from "react-icons/fa";
import { Divider } from "@heroui/react";
import { CiBarcode, CiCalendar, CiShoppingTag } from "react-icons/ci";
import { MdAbc } from "react-icons/md";
import { IoChatboxEllipsesOutline,IoCarSportOutline } from "react-icons/io5";
import { LuPhone, LuWrench } from "react-icons/lu";

enum VehicleBrand {
  NISSAN = "Nissan",
  HYUNDAI = "Hyundai",
  MAZDA = "Mazda"
}

export default function AddVehicleForm() {
  const toast = useToast();
  const router = useRouter();
  const { addVehicle, loading: loadingAdd } = useAddVehicles();
  const [vin, setVin] = useState("");
  const [clientName, setClientName] = useState("");
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [licensePlate, setLicensePlate] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [service, setService] = useState("");
  const [comments, setComments] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");


  const formatPhone = (digits: string) => {
    if (!digits) return "";
    const p1 = digits.slice(0, 2);
    const p2 = digits.slice(2, 4);
    const p3 = digits.slice(4, 6);
    const p4 = digits.slice(6, 8);
    const p5 = digits.slice(8, 10);
    let formatted = "(" + p1;
    if (digits.length >= 2) formatted += ")";
    if (digits.length > 2) formatted += " " + p2;
    if (digits.length > 4) formatted += " " + p3;
    if (digits.length > 6) formatted += " " + p4;
    if (digits.length > 8) formatted += " " + p5;
    return formatted;
  };

  React.useEffect(() => {
    const isValid = !!vin && !!clientName && !!brand && !!model && !!year &&
      !!licensePlate && !!clientPhone && !!service &&
      vin.length === 17 && /^\d{10}$/.test(clientPhone);
    setIsFormValid(isValid);
  }, [vin, clientName, brand, model, year, licensePlate, clientPhone, service]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    if (!vin || !clientName || !brand || !model || !year || !licensePlate || !clientPhone || !service) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }


    if (vin.length !== 17 || !/^[A-HJ-NPR-Z0-9]{17}$/i.test(vin)) {
      toast({
        title: "Error",
        description: "El VIN debe tener exactamente 17 caracteres alfanuméricos",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!/^\d{10}$/.test(clientPhone)) {
      toast({
        title: "Error",
        description: "El teléfono debe tener exactamente 10 dígitos",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const payload: AddVehiclePayload = {
      vin,
      client_name: clientName,
      brand,
      model,
      year,
      license_plate: licensePlate,
      client_phone: clientPhone,
      service,
      comments
    };


    const vehiclePromise = addVehicle(payload);

    toast.promise(vehiclePromise, {
      loading: { title: "Agregando vehículo", description: "Espere..." },
      success: (data) => ({
        title: "Vehículo agregado",
        description: data.message || "Se agregó correctamente",
      }),
      error: (err: any) => ({
        title: "Error",
        description: err.message || "Error al agregar vehículo",
      }),
    });

    try {
      const resp = await vehiclePromise;
      setSuccessMessage(resp.message || "Vehículo creado correctamente");
      setShowSuccessModal(true);
      setVin("");
      setClientName("");
      setBrand("");
      setModel("");
      setYear(new Date().getFullYear());
      setLicensePlate("");
      setClientPhone("");
      setService("");
      setComments("");
    } catch {
    }
  };


  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };


  if (loadingAdd) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-9">
      <SuccessModal
        visible={showSuccessModal}
        message={successMessage}
        onClose={handleCloseModal}
      />

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="text-lg font-bold text-dark dark:text-white">
            Ingresa los datos del nuevo vehículo
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6.5">
          <h4 className="text-sm">Información del cliente</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Nombre del cliente"
              labelPlacement="outside"
              placeholder="Ej: Juan Pérez"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              isRequired
              fullWidth
              variant="bordered"
              size="lg"
              startContent={<FaRegUser />}
            />
            <Input
              label="Teléfono del cliente"
              labelPlacement="outside"
              placeholder="(55) 12 34 56 78"
              value={formatPhone(clientPhone)}
              onChange={(e) => {
                const rawValue = e.target.value;
                const digitsFromRaw = rawValue.replace(/\D/g, "");
                const isDeleting = rawValue.length < formatPhone(clientPhone).length;
                let nextDigits = digitsFromRaw;
                if (isDeleting && digitsFromRaw === clientPhone) {
                  nextDigits = clientPhone.slice(0, -1);
                }

                setClientPhone(nextDigits.slice(0, 10));
              }}
              isRequired
              fullWidth
              variant="bordered"
              size="lg"
              description="10 dígitos"
              title="Sólo se permiten números"
              startContent={<LuPhone />}
              maxLength={16}
            />
          </div>
          <Divider />

          <h4 className="text-sm">Información del vehículo</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <Input
              label="VIN"
              labelPlacement="outside"
              placeholder="Ej: 1HGCM82633A123456"
              value={vin}
              onChange={(e) => setVin(e.target.value.toUpperCase())}
              isRequired
              fullWidth
              size="lg"
              maxLength={17}
              startContent={<CiBarcode />}
              variant="bordered"
              description={`${vin.length}/17 caracteres`}
            />

            <div>
              <Select
                label="Marca del vehículo"
                labelPlacement="outside"
                placeholder="Selecciona la marca"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                isRequired
                startContent={<CiShoppingTag/>}
                size="lg"
                variant="bordered"
              >
                {Object.values(VehicleBrand).map((brandName) => (
                  <SelectItem key={brandName} value={brandName}>
                    {brandName}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <Input
              label="Modelo"
              labelPlacement="outside"
              placeholder="Ej: Sentra"
              variant="bordered"
              startContent={<IoCarSportOutline/>}
              value={model}
              onChange={(e) => setModel(e.target.value)}
              isRequired
              fullWidth
              size="lg"
            />

          </div>
          <Divider />
          <div className="grid md:grid-cols-3 gap-4">

            <Input
              label="Año"
              labelPlacement="outside"
              placeholder="Ej: 2023"
              startContent={<CiCalendar/>}
              type="number"
              min="1900"
              max={new Date().getFullYear() + 1}
              value={year.toString()}
              onChange={(e) => setYear(Number(e.target.value) || new Date().getFullYear())}
              isRequired
              fullWidth
              size="lg"
              errorMessage="El año debe estar entre 1900 y un año posterior al actual"
              isInvalid={year < 1900 || year > new Date().getFullYear() + 1}
              variant="bordered"
            />

            <Input
              label="Placas"
              labelPlacement="outside"
              placeholder="Ej: ABC-123"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              isRequired
              fullWidth
              size="lg"
              variant="bordered"
              startContent={<MdAbc/>}
            />
          </div>
          <Divider />
          <h4 className="text-sm">Servicio</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Servicio a realizar"
              labelPlacement="outside"
              placeholder="Ej: Mantenimiento preventivo"
              value={service}
              onChange={(e) => setService(e.target.value)}
              isRequired
              fullWidth
              variant="bordered"
              size="lg"
              startContent={<LuWrench/>}
            />

            <Input
              label="Comentarios"
              labelPlacement="outside"
              placeholder="Ej: Revisar frenos porque rechinan al frenar"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              fullWidth
              size="lg"
              variant="bordered"
              description="Opcional - Comentarios generales o solicitudes especiales"
              startContent={<IoChatboxEllipsesOutline />}
            />
          </div>


          <div className="mt-4">
            <button
              type="submit"
              disabled={!isFormValid || loadingAdd}
              className={`font-sans relative h-14 w-full rounded-2xl bg-[#000] text-center text-xl font-semibold text-white ${!isFormValid || loadingAdd ? "cursor-not-allowed opacity-50" : "group"}`}
            >
              <div
                className={`h-12 rounded-xl bg-primary ${!isFormValid || loadingAdd ? "" : "group-hover:w-[98.3%]"} absolute left-1 top-[4px] z-10 flex w-[10%] items-center justify-center duration-700`}
              >
                {loadingAdd ? (
                  <Spinner color="current" size="sm" />
                ) : (
                  <FaCar className="text-white" />
                )}
              </div>
              <p className="translate-x-2">
                {loadingAdd ? (
                  <Spinner size="sm" color="current" />
                ) : (
                  "Agregar vehículo"
                )}
              </p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
