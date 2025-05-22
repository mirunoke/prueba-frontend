"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";

export default function Home() {

  const RUTA_INGRESAR_VEHICULO = "/create-vehicle";
  const RUTA_VER_VEHICULOS = "/vehiculos";
  return (
    <div className="h-auto flex items-center justify-center bg-transparent py-5">
      <div className="flex flex-col items-center justify-center text-center w-full max-w-6xl px-4">

        <div className="w-full flex justify-center mb-2 md:mb-4">
          <Image
            src="/images/car.svg"
            alt="Ilustración de mecánico revisando un coche en un elevador"
            width={400}
            height={400}
          />
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold text-primary">
          ¡Bienvenido!
        </h1>
        <h2 className="text-lg font-bold sm:text-xl md:text-xl text-black dark:text-white">
          Gestiona tus inspecciones con facilidad
        </h2>

        <div className="text-sm md:text-base text-gray-600  dark:text-gray-2 py-1 max-w-lg mx-auto text-center sm:text-center">
          <ul className="list-none sm:list-disc sm:list-inside space-y-1 inline-block text-center">
            <li>Registra vehículos rápidamente.</li>
            <li>Realiza revisiones técnicas detalladas.</li>
            <li>Lleva un control eficiente del mantenimiento.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}