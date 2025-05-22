"use client";

import React, { useState } from "react";
import { Progress, Button } from "@nextui-org/react";
import { useToast } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import SuccessModal from "./modals/success-modal";
import Step1Welcome from "./steps/step1-welcome";
import Step2SelectVehicle from "./steps/step2-select-vehicle";
import Step3BatteryCheck from "./steps/step3-battery-check";
import Step4TirePressure from "./steps/step4-tire-pressure";
import Step5Summary from "./steps/step5-summary";
import { useAddHyundaiInspection } from "@/hooks/inspections/add-inspections/hyundai/useAddHyundaiInspection";
import { uploadHyundaiInspectionImages } from "@/actions/inspections/hyundai/upload-inspection-images";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";

export default function AddHyundaiInspection() {
  const toast = useToast();
  const router = useRouter();
  const params = useSearchParams();
  const preselectedId = params.get("vehicleId") || "";
  const { addInspection, loading: submitting } = useAddHyundaiInspection();


  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(preselectedId);
  const [vehicleDetails, setVehicleDetails] = useState<any>(null);
  const [batteryCharge, setBatteryCharge] = useState<number>(50);
  const [tirePressure, setTirePressure] = useState({
    frontLeft: 30,
    frontRight: 30,
    rearLeft: 30,
    rearRight: 30
  });
  const [comments, setComments] = useState<string>("");
  const [batteryImage, setBatteryImage] = useState<File | null>(null);
  const [tireImages, setTireImages] = useState<File[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

  const [loaderSteps, setLoaderSteps] = useState<{ text: string }[]>([]);
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStep1Submit = () => {
    handleNextStep();
  };

  const handleStep2Submit = () => {
    if (!selectedVehicleId) {
      toast({
        title: "Error",
        description: "Por favor selecciona un vehículo para inspeccionar",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    handleNextStep();
  };

  const handleStep3Submit = () => {
    if (batteryCharge < 0 || batteryCharge > 100) {
      toast({
        title: "Error",
        description: "El nivel de carga de la batería debe estar entre 0% y 100%",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    handleNextStep();
  };

  const handleStep4Submit = () => {
    const { frontLeft, frontRight, rearLeft, rearRight } = tirePressure;
    if (frontLeft <= 0 || frontRight <= 0 || rearLeft <= 0 || rearRight <= 0) {
      toast({
        title: "Error",
        description: "La presión de los neumáticos debe ser un valor positivo",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    handleNextStep();
  };

  const handleStep5Submit = () => {
    setShowConfirmModal(true);
  };

  const handleSubmitInspection = async () => {
    try {
      setShowConfirmModal(false);
      setShowLoader(true);
      
      const stepsArr: { text: string }[] = [
        { text: "Preparando datos" },
      ];
      const hasImages = Boolean(batteryImage) || tireImages.length > 0;
      if (hasImages) stepsArr.push({ text: "Subiendo imágenes" });
      stepsArr.push({ text: "Registrando inspección" }, { text: "Inspección registrada con éxito" });
      setLoaderSteps(stepsArr);
      
      let imageUrls: string[] = [];
      if (hasImages) {
        const fd = new FormData();
        fd.append("vehicleId", selectedVehicleId);
        if (batteryImage) fd.append("images", batteryImage);
        tireImages.forEach((f) => fd.append("images", f));
        const { urls, error } = await uploadHyundaiInspectionImages(fd);
        if (error) throw new Error(error);
        imageUrls = urls || [];
      }

      const inspectionData = {
        battery_charge: batteryCharge,
        front_left: tirePressure.frontLeft,
        front_right: tirePressure.frontRight,
        rear_left: tirePressure.rearLeft,
        rear_right: tirePressure.rearRight,
        comments: comments,
        images: imageUrls
      } as any;
      
      await addInspection(selectedVehicleId, inspectionData);
      setTimeout(() => {
        router.push("/inspections/list-inspections");
      }, 2000);
    } catch (error: any) {
      setShowLoader(false);
      toast({
        title: "Error",
        description: error.message || "Ocurrió un error al registrar la inspección",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCloseSuccessModal = () => {
    setShowLoader(false);
  };

  const handleGoToVehicleList = () => {
    router.push("/vehicles");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Welcome
            onNext={handleStep1Submit}
          />
        );
      case 2:
        return (
          <Step2SelectVehicle
            selectedVehicleId={selectedVehicleId}
            setSelectedVehicleId={setSelectedVehicleId}
            setVehicleDetails={setVehicleDetails}
            onNext={handleStep2Submit}
            onBack={handlePrevStep}
          />
        );
      case 3:
        return (
          <Step3BatteryCheck
            batteryCharge={batteryCharge}
            setBatteryCharge={setBatteryCharge}
            batteryImage={batteryImage}
            setBatteryImage={setBatteryImage}
            onNext={handleStep3Submit}
            onBack={handlePrevStep}
          />
        );
      case 4:
        return (
          <Step4TirePressure
            tirePressure={tirePressure}
            setTirePressure={setTirePressure}
            comments={comments}
            setComments={setComments}
            tireImages={tireImages}
            setTireImages={setTireImages}
            onNext={handleStep4Submit}
            onBack={handlePrevStep}
          />
        );
      case 5:
        return (
          <Step5Summary
            vehicle={vehicleDetails}
            batteryCharge={batteryCharge}
            tirePressure={tirePressure}
            comments={comments}
            onSubmit={handleStep5Submit}
            onBack={handlePrevStep}
            loading={submitting}
          />
        );
      default:
        return <div>Paso no encontrado</div>;
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white p-8 shadow-default dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Paso {currentStep} de {totalSteps}</span>
          <span className="text-sm font-medium">{Math.round((currentStep/totalSteps)*100)}%</span>
        </div>
        <Progress 
          value={(currentStep/totalSteps)*100} 
          color="primary"
          className="h-2"
          aria-label="Progreso de la inspección"
        />
      </div>
            <div className="mt-4">
        {renderStep()}
      </div>
      <SuccessModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirmar inspección"
        message="¿Estás seguro de que deseas completar la inspección? Esta acción marcará el vehículo como inspeccionado."
        confirmText="Completar inspección"
        cancelText="Cancelar"
        onConfirm={handleSubmitInspection}
        onCancel={() => setShowConfirmModal(false)}
      />

      <MultiStepLoader loading={showLoader} loadingStates={loaderSteps} duration={1500} loop={false} />
    </div>
  );
}
