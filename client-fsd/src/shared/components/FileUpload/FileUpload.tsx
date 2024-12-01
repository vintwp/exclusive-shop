/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { Input } from '@/shared/ui';
import React from 'react';
import { Files, FilesGroup } from './types';
import { PreviewImage } from './PreviewImage';
import { FileName } from './FileName';

type PropsCommnon = {
  allowedFiles: FilesGroup;
  onChange: (img: File[]) => void;
  files?: File[];
  multiple?: boolean;
  title?: string;
  preview?: boolean;
  errorMessage?: string;
};

type PropsPreview =
  | { preview?: false; alt?: never }
  | { preview: true; alt: string };

type Props = PropsCommnon & PropsPreview;

export const FileUpload: React.FC<Props> = ({
  allowedFiles,
  onChange,
  files,
  multiple = true,
  title,
  preview,
  alt,
  errorMessage = '',
}) => {
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesFromInput = e.target.files;
    const uplFiles: File[] = [];

    if (!filesFromInput || !filesFromInput?.length) {
      onChange([]);

      return;
    }

    for (let i = 0; i < filesFromInput.length; i += 1) {
      uplFiles.push(filesFromInput[i]);
    }

    if (onChange) {
      onChange(uplFiles);
    }
  };

  const handleDeleteFile = (fileNameToDelete: string) => {
    const filesWithoutDeleted = files?.filter(
      file => file.name !== fileNameToDelete,
    );

    onChange(filesWithoutDeleted || []);
  };

  return (
    <div className="grid w-full items-center gap-1.5">
      <div className="flex flex-wrap items-center gap-2">
        {preview &&
          files?.map(file => (
            <PreviewImage
              key={file.name}
              file={file}
              onDelete={handleDeleteFile}
              alt={alt}
            />
          ))}
        {!preview &&
          files?.map(file => (
            <FileName
              key={file.name}
              file={file}
              onDelete={handleDeleteFile}
            />
          ))}
      </div>

      {errorMessage && (
        <p className="px-2 text-xs font-light text-clr-button-2">
          {errorMessage}
        </p>
      )}
      <label
        htmlFor="picture"
        className="block cursor-pointer rounded-md border-[1px] border-clr-primary/10 bg-slate-50
          px-2 py-1 text-center text-sm transition-colors hover:border-clr-primary/20
          hover:bg-slate-100"
      >
        {title ? `${title}` : 'Select File'}
        <div className="hidden">{title}</div>
      </label>
      <Input
        id="picture"
        type="file"
        accept={Files[allowedFiles]}
        onChange={handleChangeInput}
        multiple={multiple}
        className="hidden"
      />
    </div>
  );
};
