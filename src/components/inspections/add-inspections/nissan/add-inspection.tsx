"use client";

import React, { useState } from "react";
import { Progress, Button } from "@nextui-org/react";
import { useToast } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/common/loader";
import SuccessModal from "./modals/success-modal";
import Step1Welcome from "./steps/step1-welcome";
import Step2SelectVehicle from "./steps/step2-select-vehicle";
import Step3FrontLights from "./steps/step3-front-lights";
import Step4RearLights from "./steps/step4-rear-lights";
import Step5Summary from "./steps/step5-summary";
import { useAddNissanInspection } from "@/hooks/inspections/add-inspections/nissan/useAddNissanInspection";
import { uploadNissanInspectionImages } from "@/actions/inspections/nissan/upload-inspection-images";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";

type LightStatus = "Buen Estado" | "Cambio Recomendado" | "Requiere Cambio";

export default function AddNissanInspection() {
  const toast = useToast();
  const router = useRouter();
  const params = useSearchParams();
  const preselectedId = params.get("vehicleId") || "";
  const { addInspection, loading: submitting } = useAddNissanInspection();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(preselectedId);
  const [vehicleDetails, setVehicleDetails] = useState<any>(null);
  
  const [frontLightsStatus, setFrontLightsStatus] = useState<LightStatus>("Buen Estado");
  const [rearLightsStatus, setRearLightsStatus] = useState<LightStatus>("Buen Estado");
  const [comments, setComments] = useState<string>("");
  
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  const [showLoader, setShowLoader] = useState(false);
  const [loaderSteps, setLoaderSteps] = useState<{text:string}[]>([]);
  const [frontImage, setFrontImage] = useState<File|null>(null);
  const [rearImages, setRearImages] = useState<File[]>([]);

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
    handleNextStep();
  };

  const handleStep4Submit = () => {
    handleNextStep();
  };

  const handleStep5Submit = () => {
    setShowConfirmModal(true);
  };

  const handleSubmitInspection = async () => {
    try {
      setShowConfirmModal(false);
      setShowLoader(true);
      const stepsArr:[{text:string}]|any=[{text:"Preparando datos"}];
      const hasImages=Boolean(frontImage)||rearImages.length>0;
      if(hasImages) stepsArr.push({text:"Subiendo imágenes"});
      stepsArr.push({text:"Registrando inspección"},{text:"Inspección registrada con éxito"});
      setLoaderSteps(stepsArr);

      let imageUrls:string[]=[];
      if(hasImages){
        const fd=new FormData();
        fd.append("vehicleId",selectedVehicleId);
        if(frontImage) fd.append("images",frontImage);
        rearImages.forEach(f=>fd.append("images",f));
        const {urls,error}=await uploadNissanInspectionImages(fd);
        if(error) throw new Error(error);
        imageUrls=urls||[];
      }

      const inspectionData={
        front_lights_status:frontLightsStatus,
        rear_lights_status:rearLightsStatus,
        comments,
        images:imageUrls
      } as any;

      await addInspection(selectedVehicleId,inspectionData);
      const delay = stepsArr.length * 500;
      setTimeout(()=>{router.push("/inspections/list-inspections")}, delay);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Ocurrió un error al registrar la inspección",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
          <Step3FrontLights
            frontLightsStatus={frontLightsStatus}
            setFrontLightsStatus={setFrontLightsStatus}
            frontImage={frontImage}
            setFrontImage={setFrontImage}
            onNext={handleStep3Submit}
            onBack={handlePrevStep}
          />
        );
      case 4:
        return (
          <Step4RearLights
            rearLightsStatus={rearLightsStatus}
            setRearLightsStatus={setRearLightsStatus}
            comments={comments}
            setComments={setComments}
            rearImages={rearImages}
            setRearImages={setRearImages}
            onNext={handleStep4Submit}
            onBack={handlePrevStep}
          />
        );
      case 5:
        return (
          <Step5Summary
            vehicle={vehicleDetails}
            frontLightsStatus={frontLightsStatus}
            rearLightsStatus={rearLightsStatus}
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

      <MultiStepLoader loading={showLoader} loadingStates={loaderSteps} duration={1500} loop={false}/>
    </div>
  );
}
