/* eslint-disable no-unused-vars */
'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { StorageActionResult } from '@/types/database';
import ImageCropperModal from '@/components/ui/image-cropper-modal';
import {
  Upload,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  Crop,
} from 'lucide-react';

interface FileUploadProps {
  label: string;
  accept: string;
  maxSizeMB?: number;
  currentUrl?: string | null;
  previewType?: 'image' | 'pdf';
  enableCrop?: boolean;
  aspectRatio?: number;
  cropShape?: 'round' | 'rect';
  onUpload(formData: FormData): Promise<StorageActionResult>;
  onUrlChange?(newUrl: string | null): void;
  helperText?: string;
}

export default function FileUpload({
  label,
  accept,
  maxSizeMB = 5,
  currentUrl,
  previewType = 'image',
  enableCrop = false,
  aspectRatio = 1,
  cropShape = 'round',
  onUpload,
  onUrlChange,
  helperText,
}: FileUploadProps) {
  const [fileUrl, setFileUrl] = useState<string | null>(currentUrl || null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Cropper modal state
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Sync internal state if prop updates externally
  React.useEffect(() => {
    setFileUrl(currentUrl || null);
  }, [currentUrl]);

  const executeUpload = async (file: File) => {
    setUploading(true);
    setStatus({ type: null, message: '' });

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await onUpload(formData);
      if (res.success && res.url) {
        setFileUrl(res.url);
        if (onUrlChange) onUrlChange(res.url);
        setStatus({
          type: 'success',
          message: res.message || 'File uploaded successfully.',
        });
      } else {
        setStatus({
          type: 'error',
          message: res.error || 'Upload failed. Please try again.',
        });
      }
    } catch (err: any) {
      setStatus({
        type: 'error',
        message: err.message || 'An unexpected error occurred during upload.',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFile = (file: File) => {
    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setStatus({
        type: 'error',
        message: `File exceeds the ${maxSizeMB}MB limit.`,
      });
      return;
    }

    // Check if cropping is enabled for image files
    if (enableCrop && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setCropImageSrc(reader.result as string);
        setIsCropperOpen(true);
      };
      reader.readAsDataURL(file);
      return;
    }

    // Direct upload
    executeUpload(file);
  };

  const handleCropComplete = (croppedFile: File) => {
    setIsCropperOpen(false);
    setCropImageSrc(null);
    executeUpload(croppedFile);
  };

  const handleCropCancel = () => {
    setIsCropperOpen(false);
    setCropImageSrc(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFileUrl(null);
    if (onUrlChange) onUrlChange(null);
    if (inputRef.current) inputRef.current.value = '';
    setStatus({ type: null, message: '' });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-muted-foreground">
          {label}
        </label>
        {maxSizeMB && (
          <span className="text-[11px] text-muted-foreground">
            Max {maxSizeMB}MB
          </span>
        )}
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-4 transition-all duration-200 ${
          dragActive
            ? 'border-primary bg-primary/5 scale-[1.01]'
            : 'border-border hover:border-primary/50 bg-background/50 hover:bg-tertiary/20'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          disabled={uploading}
          className="hidden"
        />

        {uploading ? (
          <div className="py-6 flex flex-col items-center justify-center gap-2 text-primary">
            <Loader2 size={24} className="animate-spin" />
            <span className="text-xs font-medium">Uploading to Storage...</span>
          </div>
        ) : fileUrl ? (
          <div className="flex items-center justify-between gap-4">
            {previewType === 'image' ? (
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-border bg-tertiary shrink-0">
                  <Image
                    src={fileUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-foreground truncate">
                    Uploaded Image
                  </p>
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
                  >
                    <span>View full asset</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <FileText size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-foreground truncate">
                    Document PDF
                  </p>
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
                  >
                    <span>Open in new tab</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-muted-foreground group-hover:text-primary transition-colors">
                Click to replace
              </span>
              <button
                type="button"
                onClick={handleRemove}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                title="Remove file"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        ) : (
          <div className="py-4 flex flex-col items-center justify-center gap-2 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              {enableCrop ? <Crop size={18} /> : <Upload size={18} />}
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">
                <span className="text-primary font-semibold">
                  Click to upload
                </span>{' '}
                or drag and drop
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {helperText ||
                  (previewType === 'image'
                    ? 'JPEG, PNG, WebP, GIF'
                    : 'PDF document')}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Status alerts */}
      {status.type && (
        <div
          className={`px-3 py-2 rounded-xl flex items-center gap-2 text-xs font-medium animate-in fade-in duration-150 ${
            status.type === 'success'
              ? 'bg-green-500/10 text-green-600 border border-green-500/20'
              : 'bg-red-500/10 text-red-600 border border-red-500/20'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle2 size={14} className="shrink-0" />
          ) : (
            <AlertCircle size={14} className="shrink-0" />
          )}
          <span className="truncate">{status.message}</span>
        </div>
      )}

      {/* Image Cropper Modal */}
      {cropImageSrc && (
        <ImageCropperModal
          imageSrc={cropImageSrc}
          isOpen={isCropperOpen}
          aspectRatio={aspectRatio}
          cropShape={cropShape}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}
    </div>
  );
}
