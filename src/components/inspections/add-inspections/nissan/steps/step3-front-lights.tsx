"use client";

import React from "react";
import { Button, RadioGroup, Radio } from "@nextui-org/react";
import { FaLightbulb } from "react-icons/fa";
import ImageDropzone from "@/components/common/image-dropzone";

type LightStatus = "Buen Estado" | "Cambio Recomendado" | "Requiere Cambio";

interface Step3Props {
  frontLightsStatus: LightStatus;
  setFrontLightsStatus: (status: LightStatus) => void;
  frontImage: File | null;
  setFrontImage: (f: File | null) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step3FrontLights: React.FC<Step3Props> = ({
  frontLightsStatus,
  setFrontLightsStatus,
  frontImage,
  setFrontImage,
  onNext,
  onBack
}) => {
  const getStatusColor = (status: LightStatus) => {
    switch (status) {
      case "Buen Estado":
        return "success";
      case "Cambio Recomendado":
        return "warning";
      case "Requiere Cambio":
        return "danger";
      default:
        return "default";
    }
  };

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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        Inspección de luces frontales
      </h2>
      
      <div className="rounded-lg border p-6 space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className={`p-4 rounded-full ${getStatusClass(frontLightsStatus)}`}>
              <FaLightbulb size={36} />
            </div>
          </div>
          <div className={`inline-block px-4 py-2 rounded-full ${getStatusClass(frontLightsStatus)} text-sm font-medium`}>
            Estado actual: {frontLightsStatus}
          </div>
        </div>
        
        <div className="mt-8">
          <RadioGroup
            label="Seleccione el estado de las luces frontales"
            value={frontLightsStatus}
            onValueChange={(value) => setFrontLightsStatus(value as LightStatus)}
            orientation="horizontal"
            classNames={{
              base: "w-full justify-between"
            }}
          >
            <Radio 
              value="Buen Estado" 
              color="success"
              description="Las luces funcionan correctamente"
              className="max-w-full"
            >
              Buen estado
            </Radio>
            <Radio 
              value="Cambio Recomendado" 
              color="warning"
              description="Funcionan pero requieren atención próximamente"
              className="max-w-full"
            >
              Cambio recomendado
            </Radio>
            <Radio 
              value="Requiere Cambio" 
              color="danger"
              description="Presentan fallas importantes"
              className="max-w-full"
            >
              Requiere cambio
            </Radio>
          </RadioGroup>
        </div>
        
        <div className="mt-6 bg-primary-50 p-4 rounded-lg border border-primary-100">
          <h3 className="text-md font-semibold mb-2 text-primary">Instrucciones</h3>
          <p className="text-primary text-sm">
            Evalúe el estado de las luces frontales del vehículo Nissan:
          </p>
          <ul className="list-disc pl-5 mt-2 text-sm text-primary">
            <li><strong>Buen estado:</strong> Las luces funcionan correctamente, sin fallas ni deterioro visible.</li>
            <li><strong>Cambio recomendado:</strong> Las luces funcionan pero muestran signos de desgaste o pérdida de intensidad.</li>
            <li><strong>Requiere cambio:</strong> Las luces fallan, tienen daños evidentes o no funcionan correctamente.</li>
          </ul>
        </div>
      </div>
      
      <ImageDropzone
        files={frontImage ? [frontImage] : []}
        setFiles={(files)=>setFrontImage(files[0]||null)}
        label="Foto de luces frontales (opcional)"
      />

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

export default Step3FrontLights; 