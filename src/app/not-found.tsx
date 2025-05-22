"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";

const NotFound = () => {
  return (
    <Card className="mt-4">
       <CardBody>
        <div className="flex flex-col items-center justify-center h-auto p-9 text-center">
        <div className="w-full flex justify-center mb-2 md:mb-4">
          <Image
            src="/images/404.svg"
            alt="Ilustración de mecánico revisando un coche en un elevador"
            width={400}
            height={400}
          />
        </div>
          
          <h1 className="mt-8 font-semibold text-xl">Lo siento, no encontré esta página.</h1>
          <p className="mt-4 text-gray-600 text-sm">
          Puede que haya sido movida o que ya no exista. Si fue un error mío, gracias por tu paciencia.
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default NotFound;
