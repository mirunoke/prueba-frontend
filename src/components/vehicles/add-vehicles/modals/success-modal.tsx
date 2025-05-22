import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { DotLottiePlayer } from '@dotlottie/react-player';


interface SuccessModalProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  message,
  onClose,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  React.useEffect(() => {
    if (visible) {
      onOpen();
    }
  }, [visible, onOpen]);

  const handleGoToList = () => {

    router.push("/vehicles/list-vehicles");
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
        onOpenChange();
      }}
    >
      <ModalContent>
        {(onCloseModal) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-green-600">
              ¡Éxito!
            </ModalHeader>

            <ModalBody>
              <div className="flex justify-center">
                  <DotLottiePlayer 
                    src="/lotties/success.lottie"
                    autoplay
                    loop={false}
                    style={{ height: "200px", width: "200px" }}
                  />
                </div>
              <p className="flex justify-center">{message}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                variant="light"
                onPress={() => {
                  onCloseModal();
                }}
              >
                Agregar otro vehículo
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  onCloseModal();
                  handleGoToList();
                }}
              >
                Ir al listado
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal; 