"use client";

import React from "react";
import { Button, Card, CardBody, CardHeader, Progress } from "@nextui-org/react";
import { FaLightbulb, FaBatteryFull, FaBatteryHalf, FaBatteryQuarter } from "react-icons/fa";

type LightStatus = "Buen Estado" | "Cambio Recomendado" | "Requiere Cambio";

interface Step5Props {
  vehicle: any;
  batteryCharge: number;
  frontLightsStatus: LightStatus;
  rearLightsStatus: LightStatus;
  comments: string;
  onSubmit: () => void;
  onBack: () => void;
  loading?: boolean;
}

const Step5Summary: React.FC<Step5Props> = ({
  vehicle,
  batteryCharge,
  frontLightsStatus,
  rearLightsStatus,
  comments,
  onSubmit,
  onBack,
  loading = false
}) => {
  const getBatteryIcon = () => {
    if (batteryCharge >= 70) return <FaBatteryFull size={20} className="text-green-500" />;
    if (batteryCharge >= 30) return <FaBatteryHalf size={20} className="text-yellow-500" />;
    return <FaBatteryQuarter size={20} className="text-red-500" />;
  };
  const batteryColor = batteryCharge >= 70 ? "success" : batteryCharge >= 30 ? "warning" : "danger";

  const getStatusClass = (status: LightStatus) => {
    switch (status) {
      case "Buen Estado":
        return "bg-green-100 text-green-800 border-green-200";
      case "Cambio Recomendado":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Requiere Cambio":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  const getStatusIcon = (status: LightStatus) => {
    switch (status) {
      case "Buen Estado":
        return "text-green-500";
      case "Cambio Recomendado":
        return "text-yellow-500";
      case "Requiere Cambio":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Resumen de la inspección</h2>

      {vehicle && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Vehículo</h3>
          </CardHeader>
          <CardBody className="space-y-1 text-sm">
            <p><span className="font-medium">VIN:</span> {vehicle.vin}</p>
            <p><span className="font-medium">Cliente:</span> {vehicle.client_name}</p>
            <p><span className="font-medium">Modelo:</span> {vehicle.model} ({vehicle.year})</p>
            <p><span className="font-medium">Placas:</span> {vehicle.license_plate}</p>
          </CardBody>
        </Card>
      )}

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Nivel de batería</h3>
        </CardHeader>
        <CardBody>
          <div className="flex items-center gap-2 mb-2">
            {getBatteryIcon()}
            <span className="text-md font-semibold">{batteryCharge}%</span>
          </div>
          <Progress value={batteryCharge} color={batteryColor} className="h-2" aria-label="Batería" />
        </CardBody>
      </Card>

      <Card>
        <CardHeader><h3 className="text-lg font-semibold">Luces frontales</h3></CardHeader>
        <CardBody>
          <div className="flex items-center gap-2 mb-2">
            <FaLightbulb size={20} className={getStatusIcon(frontLightsStatus)} />
            <span className="text-md font-semibold">{frontLightsStatus}</span>
            <span className={`ml-2 inline-block px-3 py-1 rounded-full border ${getStatusClass(frontLightsStatus)} text-xs`}>
              {frontLightsStatus}
            </span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader><h3 className="text-lg font-semibold">Luces posteriores</h3></CardHeader>
        <CardBody>
          <div className="flex items-center gap-2 mb-2">
            <FaLightbulb size={20} className={getStatusIcon(rearLightsStatus)} />
            <span className="text-md font-semibold">{rearLightsStatus}</span>
            <span className={`ml-2 inline-block px-3 py-1 rounded-full border ${getStatusClass(rearLightsStatus)} text-xs`}>
              {rearLightsStatus}
            </span>
          </div>
        </CardBody>
      </Card>

      {comments && (
        <Card>
          <CardHeader><h3 className="text-lg font-semibold">Comentarios</h3></CardHeader>
          <CardBody><p className="text-sm whitespace-pre-wrap">{comments}</p></CardBody>
        </Card>
      )}

      <div className="flex justify-between mt-6">
        <Button color="default" variant="flat" onClick={onBack} className="px-8">Anterior</Button>
        <Button color="primary" onClick={onSubmit} className="px-8" isLoading={loading} isDisabled={loading}>
          Confirmar y guardar
        </Button>
      </div>
    </div>
  );
};

export default Step5Summary; 