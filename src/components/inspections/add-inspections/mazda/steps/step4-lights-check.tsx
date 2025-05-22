"use client";

import React from "react";
import { Button, RadioGroup, Radio, Textarea } from "@nextui-org/react";
import { FaLightbulb } from "react-icons/fa";
import ImageDropzone from "@/components/common/image-dropzone";

type LightStatus = "Buen Estado" | "Cambio Recomendado" | "Requiere Cambio";

interface Step4Props {
  frontLightsStatus: LightStatus;
  setFrontLightsStatus: (status: LightStatus) => void;
  rearLightsStatus: LightStatus;
  setRearLightsStatus: (status: LightStatus) => void;
  comments: string;
  setComments: (c: string) => void;
  lightsImages: File[];
  setLightsImages: (files: File[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step4LightsCheck: React.FC<Step4Props> = ({
  frontLightsStatus,
  setFrontLightsStatus,
  rearLightsStatus,
  setRearLightsStatus,
  comments,
  setComments,
  lightsImages,
  setLightsImages,
  onNext,
  onBack
}) => {
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

  const getStatusIconColorClass = (status: LightStatus) => {
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

  const renderGroup = (
    title: string,
    status: LightStatus,
    setStatus: (s: LightStatus) => void
  ) => (
    <div className="rounded-lg border p-6 space-y-6">
      <div className="text-center">
        <div className={`inline-flex items-center justify-center p-4 rounded-full border ${getStatusClass(status)}`}> 
          <FaLightbulb size={32} className={getStatusIconColorClass(status)} />
        </div>
        <div className={`mt-2 inline-block px-4 py-1 rounded-full border text-sm font-medium ${getStatusClass(status)}`}> 
          {status}
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold mb-3 text-center md:text-left">{title}</h3>
        <RadioGroup
          value={status}
          onValueChange={(v) => setStatus(v as LightStatus)}
          orientation="horizontal"
          classNames={{ base: "w-full justify-between" }}
        >
          <Radio value="Buen Estado" color="success">Buen estado</Radio>
          <Radio value="Cambio Recomendado" color="warning">Cambio recomendado</Radio>
          <Radio value="Requiere Cambio" color="danger">Requiere cambio</Radio>
        </RadioGroup>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Inspección de luces</h2>
      <div className="rounded-lg border p-6 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {renderGroup("Luces Frontales", frontLightsStatus, setFrontLightsStatus)}
          {renderGroup("Luces Posteriores", rearLightsStatus, setRearLightsStatus)}
        </div>

        <Textarea
          label="Comentarios adicionales"
          placeholder="Ingresa observaciones adicionales"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          labelPlacement="outside"
          className="w-full"
          minRows={3}
        />

        <ImageDropzone
          multiple
          files={lightsImages}
          setFiles={setLightsImages}
          label="Fotografías de las luces (opcional)"
        />

        <div className="bg-primary-50 p-4 dark:bg-primary-400 rounded-lg border border-primary-100">
          <h3 className="text-md font-semibold mb-2 text-primary dark:text-white">Instrucciones</h3>
          <p className="text-primary text-sm dark:text-white">Evalúa el estado de las luces frontales y posteriores del vehículo Mazda:</p>
          <ul className="list-disc pl-5 mt-2 text-sm text-primary space-y-1 dark:text-white">
            <li><strong>Buen Estado:</strong> Funcionan correctamente y sin deterioro visible.</li>
            <li><strong>Cambio Recomendado:</strong> Funcionan pero muestran desgaste o menor intensidad.</li>
            <li><strong>Requiere Cambio:</strong> Presentan fallas graves o no funcionan.</li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <Button color="default" variant="flat" onClick={onBack} className="px-8">Anterior</Button>
        <Button color="primary" onClick={onNext} className="px-8">Continuar</Button>
      </div>
    </div>
  );
};

export default Step4LightsCheck; 