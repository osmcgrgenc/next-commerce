"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  label: string;
  maxFiles?: number;
  files: File[];
  onFilesChange: (files: File[]) => void;
}

export function ImageUpload({ label, maxFiles = 1, files, onFilesChange }: ImageUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (maxFiles === 1) {
      onFilesChange([acceptedFiles[0]]);
    } else {
      onFilesChange(prev => [...prev, ...acceptedFiles].slice(0, maxFiles));
    }
  }, [maxFiles, onFilesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles,
  });

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-500'}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-indigo-500">Dosyaları buraya bırakın...</p>
        ) : (
          <p>Dosya yüklemek için tıklayın veya sürükleyin</p>
        )}
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 