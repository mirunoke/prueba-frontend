"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
  useDisclosure,
} from "@nextui-org/react";
import Stack from "@/components/ui/stack";
import { useGetNissanInspectionDetails } from "@/hooks/inspections/list-inspections/nissan/useGetInspectionDetails";
import { Inspection } from "@/types/inspections/Inspection";
import Loader from "@/components/common/loader";
import { formatDate } from "@/utils/date-utils";

interface ViewNissanInspectionModalProps {
  inspection: Inspection; 
  onClose: () => void;
}

const ViewNissanInspectionModal: React.FC<ViewNissanInspectionModalProps> = ({
  inspection,
  onClose,
}) => {
  const { isOpen, onOpenChange } = useDisclosure({ defaultOpen: true });
  const { inspection: fullInspection, loading, error } = useGetNissanInspectionDetails(inspection.id);

  const data = fullInspection ?? inspection;
  const vehicle = (data as any).vehicle_info ?? (data as any).vehicle;

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()} size="5xl">
      <ModalContent>
        {(onModalClose) => (
          <>
            <ModalHeader>Detalles de inspección</ModalHeader>
            <ModalBody>
              {loading ? (
                <Loader />
              ) : error ? (
                <p className="text-red-500">{error.message}</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 flex items-center gap-2">
                    <Chip color={data.status === "Completado" ? "success" : "danger"}>{data.status}</Chip>
                    <span className="text-sm text-gray-500">{formatDate(data.inspection_date)}</span>
                  </div>
                  <div className="md:col-span-2 grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-gray-500">Cliente</span>
                      <p className="font-medium">{vehicle.client_name}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">VIN</span>
                      <p className="font-medium break-all">{vehicle.vin}</p>
                    </div>

                    <div>
                      <span className="text-xs text-gray-500">Luces Frontales</span>
                      <p className="font-medium">{data.front_lights_status}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Luces Posteriores</span>
                      <p className="font-medium">{data.rear_lights_status}</p>
                    </div>

                    <div className="md:col-span-2">
                      <span className="text-xs text-gray-500">Comentarios</span>
                      <p className="font-medium whitespace-pre-line">{data.comments || "Sin comentarios"}</p>
                    </div>
                  </div>
                  {data.images && data.images.length > 0 && (
                    <div className="flex justify-center">
                      <Stack
                        randomRotation={true}
                        sensitivity={100}
                        sendToBackOnClick={false}
                        cardDimensions={{ width: 260, height: 380 }}
                        cardsData={data.images.map((img: any) => ({ id: img.id, img: img.image_url || img.url }))}
                      />
                    </div>
                  )}
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onModalClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ViewNissanInspectionModal;
