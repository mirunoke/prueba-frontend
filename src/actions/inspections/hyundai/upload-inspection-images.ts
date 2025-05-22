"use server";

import { bucket } from "@/lib/storage/firebase";

interface UploadResult {
  urls?: string[];
  error?: string;
}

export async function uploadHyundaiInspectionImages(formData: FormData): Promise<UploadResult> {
  try {
    const vehicleId = formData.get("vehicleId") as string;
    if (!vehicleId) return { error: "vehicleId requerido" };

    const files = formData.getAll("images") as File[];
    if (files.length === 0) return { urls: [] };

    const urls: string[] = [];
    for (const file of files) {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `inspections/hyundai/${vehicleId}/${Date.now()}-${file.name}`;
      const buffer = Buffer.from(await file.arrayBuffer());
      await bucket.file(path).save(buffer, {
        metadata: { contentType: file.type },
      });
      const [signedUrl] = await bucket.file(path).getSignedUrl({
        action: "read",
        expires: "03-09-2491",
      });
      urls.push(signedUrl);
    }
    return { urls };
  } catch (e) {
    console.error("Upload error", e);
    return { error: "Error al subir imágenes" };
  }
} 