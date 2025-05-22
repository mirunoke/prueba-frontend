"use client";

import React from "react";
import { Button, Slider } from "@nextui-org/react";
import { FaBatteryFull, FaBatteryHalf, FaBatteryQuarter } from "react-icons/fa";
import ImageDropzone from "@/components/common/image-dropzone";

interface Step3Props {
  batteryCharge: number;
  setBatteryCharge: (value: number) => void;
  batteryImage: File | null;
  setBatteryImage: (file: File | null) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step3BatteryCheck: React.FC<Step3Props> = ({
  batteryCharge,
  setBatteryCharge,
  batteryImage,
  setBatteryImage,
  onNext,
  onBack
}) => {
  const getBatteryIcon = () => {
    if (batteryCharge >= 70) return <FaBatteryFull size={24} className="text-green-500" />;
    if (batteryCharge >= 30) return <FaBatteryHalf size={24} className="text-yellow-500" />;
    return <FaBatteryQuarter size={24} className="text-red-500" />;
  };

  const getBatteryColor = () => {
    if (batteryCharge >= 70) return "success";
    if (batteryCharge >= 30) return "warning";
    return "danger";
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
    return "Baja - Requiere atención";
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        Inspección de batería
      </h2>
      
      <div className="rounded-lg border p-6 space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            {getBatteryIcon()}
            <span className="ml-2 text-xl font-semibold">{batteryCharge}%</span>
          </div>
          <div className={`inline-block px-4 py-2 rounded-full ${getBatteryLevelClass()} text-sm font-medium`}>
            {getBatteryStatus()}
          </div>
        </div>
        
        <div className="mt-8">
          <label className="block text-sm font-medium mb-2">
            Nivel de carga de la batería
          </label>
          <Slider
            size="lg"
            step={1}
            minValue={0}
            maxValue={100}
            value={batteryCharge}
            onChange={(value) => setBatteryCharge(Number(value))}
            color={getBatteryColor() as any}
            showSteps={true}
            marks={[
              {
                value: 0,
                label: "0%"
              },
              {
                value: 25,
                label: "25%"
              },
              {
                value: 50,
                label: "50%"
              },
              {
                value: 75,
                label: "75%"
              },
              {
                value: 100,
                label: "100%"
              }
            ]}
            className="max-w-md mx-auto"
            classNames={{
              base: "max-w-md mx-auto",
              track: "h-3",
              filler: "h-3"
            }}
          />
        </div>
        
        <div className="mt-6">
          <ImageDropzone
            files={batteryImage ? [batteryImage] : []}
            setFiles={(files) => setBatteryImage(files[0] || null)}
            label="Sube fotografía de la batería (opcional)"
          />
        </div>
        
        <div className="mt-6 bg-primary-50 p-4 dark:bg-primary-400 rounded-lg border border-primary-100">
          <h3 className="text-md font-semibold mb-2 dark:text-white text-primary">Instrucciones</h3>
          <p className="text-primary text-sm dark:text-white">
            Mueve el slider para indicar el nivel de carga de la batería del vehículo Hyundai.
            Es importante que esta medición sea precisa para garantizar el correcto funcionamiento del vehículo.
          </p>
          <ul className="list-disc pl-5 mt-2 text-sm text-primary dark:text-white">
            <li>Menos de 30%: La batería necesita atención inmediata</li>
            <li>Entre 30% y 70%: La batería está en condiciones aceptables</li>
            <li>Más de 70%: La batería está en óptimas condiciones</li>
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

export default Step3BatteryCheck; 