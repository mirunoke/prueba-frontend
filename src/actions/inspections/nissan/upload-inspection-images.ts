"use server";

import { bucket } from "@/lib/storage/firebase";

interface UploadResult { urls?: string[]; error?: string; }

export async function uploadNissanInspectionImages(formData: FormData): Promise<UploadResult> {
  try {
    const vehicleId = formData.get("vehicleId") as string;
    if (!vehicleId) return { error: "vehicleId requerido" };
    const files = formData.getAll("images") as File[];
    if (files.length === 0) return { urls: [] };
    const urls: string[] = [];
    for (const file of files) {
      const path = `inspections/nissan/${vehicleId}/${Date.now()}-${file.name}`;
      const buf = Buffer.from(await file.arrayBuffer());
      await bucket.file(path).save(buf, { metadata: { contentType: file.type } });
      const [signed] = await bucket.file(path).getSignedUrl({ action: "read", expires: "03-09-2491" });
      urls.push(signed);
    }
    return { urls };
  } catch (e) {
    console.error("upload nissan", e);
    return { error: "Error al subir imágenes" };
  }
} 