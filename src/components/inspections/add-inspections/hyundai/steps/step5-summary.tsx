"use client";

import React from "react";
import { Button, Card, CardBody, CardHeader, Progress } from "@nextui-org/react";
import { FaBatteryFull, FaBatteryHalf, FaBatteryQuarter } from "react-icons/fa";

interface TirePressure {
  frontLeft: number;
  frontRight: number;
  rearLeft: number;
  rearRight: number;
}

interface Step5Props {
  vehicle: any;
  batteryCharge: number;
  tirePressure: TirePressure;
  comments: string;
  onSubmit: () => void;
  onBack: () => void;
  loading?: boolean;
}

const Step5Summary: React.FC<Step5Props> = ({
  vehicle,
  batteryCharge,
  tirePressure,
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

  const batteryLevelClasses = {
    low: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    high: "bg-green-100 text-green-800 border-green-200"
  };

  const getBatteryLevelClass = () => {
    if (batteryCharge >= 70) return batteryLevelClasses.high;
    if (batteryCharge >= 30) return batteryLevelClasses.medium;
    return batteryLevelClasses.low;
  };

  const getBatteryStatus = () => {
    if (batteryCharge >= 70) return "Óptima";
    if (batteryCharge >= 30) return "Aceptable";
    return "Baja";
  };

  const getStatusColor = (pressure: number) => {
    if (pressure < 25) return "text-red-500";
    if (pressure < 30) return "text-yellow-500";
    if (pressure > 40) return "text-red-500";
    if (pressure > 35) return "text-yellow-500";
    return "text-green-500";
  };

  const getStatusText = (pressure: number) => {
    if (pressure < 25) return "Baja";
    if (pressure < 30) return "Precaución";
    if (pressure > 40) return "Alta";
    if (pressure > 35) return "Precaución";
    return "Óptima";
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        Resumen de la inspección
      </h2>

      {vehicle && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Vehículo</h3>
          </CardHeader>
          <CardBody className="space-y-1 text-sm">
            <p>
              <span className="font-medium">VIN:</span> {vehicle.vin}
            </p>
            <p>
              <span className="font-medium">Cliente:</span> {vehicle.client_name}
            </p>
            <p>
              <span className="font-medium">Modelo:</span> {vehicle.model} ({vehicle.year})
            </p>
            <p>
              <span className="font-medium">Placas:</span> {vehicle.license_plate}
            </p>
          </CardBody>
        </Card>
      )}

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Estado de la batería</h3>
        </CardHeader>
        <CardBody>
          <div className="flex items-center gap-2 mb-4">
            {getBatteryIcon()}
            <span className="text-xl font-semibold">{batteryCharge}%</span>
            <span
              className={`ml-2 inline-block px-3 py-1 rounded-full border ${getBatteryLevelClass()} text-xs`}>
              {getBatteryStatus()}
            </span>
          </div>
          <Progress
            value={batteryCharge}
            color={batteryCharge >= 70 ? "success" : batteryCharge >= 30 ? "warning" : "danger"}
            className="h-2"
            aria-label="Nivel de batería"
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Presión de neumáticos (PSI)</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p>
              <span className="font-medium">Delantera izquierda:</span>{" "}
              <span className={getStatusColor(tirePressure.frontLeft)}>
                {tirePressure.frontLeft} ({getStatusText(tirePressure.frontLeft)})
              </span>
            </p>
            <p>
              <span className="font-medium">Delantera derecha:</span>{" "}
              <span className={getStatusColor(tirePressure.frontRight)}>
                {tirePressure.frontRight} ({getStatusText(tirePressure.frontRight)})
              </span>
            </p>
            <p>
              <span className="font-medium">Trasera izquierda:</span>{" "}
              <span className={getStatusColor(tirePressure.rearLeft)}>
                {tirePressure.rearLeft} ({getStatusText(tirePressure.rearLeft)})
              </span>
            </p>
            <p>
              <span className="font-medium">Trasera derecha:</span>{" "}
              <span className={getStatusColor(tirePressure.rearRight)}>
                {tirePressure.rearRight} ({getStatusText(tirePressure.rearRight)})
              </span>
            </p>
          </div>
        </CardBody>
      </Card>

      {comments && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Comentarios adicionales</h3>
          </CardHeader>
          <CardBody>
            <p className="text-sm whitespace-pre-wrap">{comments}</p>
          </CardBody>
        </Card>
      )}

      <div className="flex justify-between mt-6">
        <Button color="default" variant="flat" onClick={onBack} className="px-8">
          Anterior
        </Button>
        <Button
          color="primary"
          onClick={onSubmit}
          className="px-8"
          isDisabled={loading}
          isLoading={loading}
        >
          Confirmar y guardar
        </Button>
      </div>
    </div>
  );
};

export default Step5Summary; 