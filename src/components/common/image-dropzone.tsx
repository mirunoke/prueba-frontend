"use client";

import React, { useCallback, useRef, useState } from "react";
import { FaCloudUploadAlt, FaImages } from "react-icons/fa";

interface ImageDropzoneProps {
  files: File[];
  setFiles: (files: File[]) => void;
  multiple?: boolean;
  label?: string;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ files, setFiles, multiple = false, label }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((fList: FileList | null) => {
    if (!fList) return;
    const arr = Array.from(fList);
    setFiles(multiple ? [...files, ...arr] : [arr[0]]);
  }, [files, multiple, setFiles]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      className={`flex mt-6 flex-col items-center justify-center w-full cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors ${isDragging ? "border-primary bg-primary/10" : "border-default-200 dark:border-default-600"}`}
    >
      <FaCloudUploadAlt size={32} className="mb-2 text-primary" />
      <p className="text-sm text-default-500 mb-1">{label || "Arrastra imágenes o haz clic para seleccionar"}</p>
      <p className="text-xs text-default-400">{multiple ? "Puedes seleccionar múltiples archivos" : "Solo un archivo"}</p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />

      {files.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2 justify-center max-w-full">
          {files.map((file, idx) => (
            <div key={idx} className="flex items-center gap-1 text-xs bg-default-100 px-2 py-0.5 rounded">
              <FaImages /> {file.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageDropzone; 