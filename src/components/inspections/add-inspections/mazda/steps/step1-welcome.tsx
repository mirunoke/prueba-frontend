"use client";

import React from "react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { SiNissan } from "react-icons/si";

interface Step1Props {
  onNext: () => void;
}

const Step1Welcome: React.FC<Step1Props> = ({ onNext }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        Bienvenido a la Inspección de vehículos Mazda
      </h2>
      
      <Card className="bg-primary-50 dark:bg-primary-400 ">
        <CardHeader className="flex gap-3">
          <div className="flex p-2 bg-primary text-white dark:bg-black rounded-full">
            <SiNissan size={24} />
          </div>
          <div className="flex flex-col">
            <p className="text-xl font-semibold">Inspección de Mazda</p>
            <p className="text-small text-default-500">Proceso sencillo en 5 pasos</p>
          </div>
        </CardHeader>
        <CardBody>
          <p className="mb-4 dark:text-white">
            Estás a punto de iniciar el proceso de inspección para un vehículo Mazda. Durante este proceso revisaremos:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6 dark:text-white">
            <li><strong>Nivel de carga de la batería</strong> - Mide el porcentaje de carga actual.</li>
            <li><strong>Estado de las luces frontales</strong> - Verificaremos su funcionamiento y estado.</li>
            <li><strong>Estado de las luces posteriores</strong> - Comprobaremos su condición general.</li>
          </ul>
          <p className="font-medium">
            Una vez finalizada la inspección, el vehículo se marcará como inspeccionado.
          </p>
        </CardBody>
      </Card>

      <div className="flex justify-end mt-6">
        <Button color="primary" onClick={onNext} className="px-8">
          Comenzar inspección
        </Button>
      </div>
    </div>
  );
};

export default Step1Welcome; 