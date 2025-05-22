"use client";

import React from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import ImageDropzone from "@/components/common/image-dropzone";

interface TirePressure {
  frontLeft: number;
  frontRight: number;
  rearLeft: number;
  rearRight: number;
}

interface Step4Props {
  tirePressure: TirePressure;
  setTirePressure: (pressure: TirePressure) => void;
  comments: string;
  setComments: (comments: string) => void;
  tireImages: File[];
  setTireImages: (files: File[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step4TirePressure: React.FC<Step4Props> = ({
  tirePressure,
  setTirePressure,
  comments,
  setComments,
  tireImages,
  setTireImages,
  onNext,
  onBack
}) => {
  const handleTirePressureChange = (key: keyof TirePressure, value: string) => {
    const numValue = value === "" ? 0 : Number(value);
    setTirePressure({
      ...tirePressure,
      [key]: numValue
    });
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
        Inspección de presión de neumáticos
      </h2>
      
      <div className="rounded-lg border p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        
          <div className="relative aspect-video bg-gray-100 dark:bg-gray-dark rounded-lg border border-gray-300 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 w-3/4 h-3/4 relative">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-12 h-12 border-4 dark:bg-gray-dark border-gray-400 rounded-full flex items-center justify-center bg-white">
                  <span className={`font-bold ${getStatusColor(tirePressure.frontLeft)}`}>
                    {tirePressure.frontLeft}
                  </span>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-12 h-12 border-4 dark:bg-gray-dark border-gray-400 rounded-full flex items-center justify-center bg-white">
                  <span className={`font-bold ${getStatusColor(tirePressure.frontRight)}`}>
                    {tirePressure.frontRight}
                  </span>
                </div>
              </div>
              
              <div className="col-span-2 border-2 border-gray-400 rounded-lg dark:bg-gray-dark flex items-center justify-center">
                <span className="text-gray-600 dark:text-white font-medium">Hyundai</span>
              </div>
              
              <div className="relative">
                <div className="absolute -bottom-6 -left-6 w-12 h-12 border-4  dark:bg-gray-dark border-gray-400 rounded-full flex items-center justify-center bg-white">
                  <span className={`font-bold ${getStatusColor(tirePressure.rearLeft)}`}>
                    {tirePressure.rearLeft}
                  </span>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -bottom-6 -right-6 w-12 h-12 border-4  dark:bg-gray-dark border-gray-400 rounded-full flex items-center justify-center bg-white">
                  <span className={`font-bold ${getStatusColor(tirePressure.rearRight)}`}>
                    {tirePressure.rearRight}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  type="number"
                  label="Delantera izquierda (PSI)"
                  labelPlacement="outside"
                  value={tirePressure.frontLeft.toString()}
                  onChange={(e) => handleTirePressureChange("frontLeft", e.target.value)}
                  min={0}
                  max={50}
                  endContent={<div className="text-sm text-gray-500">PSI</div>}
                  description={<span className={getStatusColor(tirePressure.frontLeft)}>{getStatusText(tirePressure.frontLeft)}</span>}
                  isRequired
                />
              </div>
              <div>
                <Input
                  type="number"
                  label="Delantera derecha (PSI)"
                  labelPlacement="outside"
                  value={tirePressure.frontRight.toString()}
                  onChange={(e) => handleTirePressureChange("frontRight", e.target.value)}
                  min={0}
                  max={50}
                  endContent={<div className="text-sm text-gray-500">PSI</div>}
                  description={<span className={getStatusColor(tirePressure.frontRight)}>{getStatusText(tirePressure.frontRight)}</span>}
                  isRequired
                />
              </div>
              <div>
                <Input
                  type="number"
                  label="Trasera izquierda (PSI)"
                  labelPlacement="outside"
                  value={tirePressure.rearLeft.toString()}
                  onChange={(e) => handleTirePressureChange("rearLeft", e.target.value)}
                  min={0}
                  max={50}
                  endContent={<div className="text-sm text-gray-500">PSI</div>}
                  description={<span className={getStatusColor(tirePressure.rearLeft)}>{getStatusText(tirePressure.rearLeft)}</span>}
                  isRequired
                />
              </div>
              <div>
                <Input
                  type="number"
                  label="Trasera derecha (PSI)"
                  labelPlacement="outside"
                  value={tirePressure.rearRight.toString()}
                  onChange={(e) => handleTirePressureChange("rearRight", e.target.value)}
                  min={0}
                  max={50}
                  endContent={<div className="text-sm text-gray-500">PSI</div>}
                  description={<span className={getStatusColor(tirePressure.rearRight)}>{getStatusText(tirePressure.rearRight)}</span>}
                  isRequired
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <Textarea
            label="Comentarios adicionales"
            placeholder="Ingresa cualquier observación adicional sobre la inspección"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full"
            labelPlacement="outside"
            minRows={3}
          />
        </div>
        
        <ImageDropzone
          multiple
          files={tireImages}
          setFiles={setTireImages}
          label="Sube fotografías de los neumáticos (opcional)"
        />
        
        <div className="mt-6 bg-primary-50 p-4  dark:bg-primary-400 rounded-lg border border-primary-100">
          <h3 className="text-md font-semibold mb-2  dark:text-white text-primary">Instrucciones</h3>
          <p className="text-primary text-sm dark:text-white">
            Ingresa la presión de cada neumático en PSI (Pounds per Square Inch).
            La presión recomendada para vehículos Hyundai suele estar entre 30-35 PSI.
          </p>
          <ul className="list-disc pl-5 mt-2 text-sm text-primary dark:text-white">
            <li>Menos de 25 PSI: Presión baja - Peligroso</li>
            <li>Entre 25-30 PSI: Presión baja - Precaución</li>
            <li>Entre 30-35 PSI: Presión óptima</li>
            <li>Entre 35-40 PSI: Presión alta - Precaución</li>
            <li>Más de 40 PSI: Presión alta - Peligroso</li>
          </ul>
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button 
          color="default" 
          variant="flat" 
          onClick={onBack}
          className="px-8"
        >
          Anterior
        </Button>
        <Button 
          color="primary" 
          onClick={onNext}
          className="px-8"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default Step4TirePressure; 