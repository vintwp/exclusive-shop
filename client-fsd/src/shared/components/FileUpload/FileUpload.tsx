/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { Button, Input } from '@/shared/ui';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Files, FilesGroup } from './types';

type Props = {
  allowedFiles: FilesGroup;
  onChange: (img: File[]) => void;
  files?: File[];
  multiple?: boolean;
  title?: string;
  preview?: boolean;
};

type PreviewImageProps = {
  file: File;
  onDelete: (v: string) => void;
};

const PreviewImage: React.FC<PreviewImageProps> = ({ file, onDelete }) => {
  const [urlImage, setUrlImage] = useState<string>('');

  useEffect(() => {
    setUrlImage(URL.createObjectURL(file));

    return () => {
      URL.revokeObjectURL(urlImage);
    };
  }, []);

  return (
    <div className="relative p-2 hover:bg-slate-50">
      {urlImage ? (
        <Image
          src={urlImage}
          alt="test"
          width={100}
          height={100}
        />
      ) : (
        <div className="h-[100px] w-[100px] bg-slate-200" />
      )}

      <div className="absolute right-1 top-1">
        <Button
          type="button"
          size="icon"
          className="hover:bg-text-clr-text-2 h-4 w-4 rounded-full bg-transparent text-clr-text-2
            hover:text-clr-primary"
          onClick={() => onDelete(file.name)}
        >
          <X />
        </Button>
      </div>
    </div>
  );
};

const FileName: React.FC<PreviewImageProps> = ({ file, onDelete }) => {
  return (
    <div
      key={file.name}
      className="flex items-center gap-1 rounded-lg p-1 hover:bg-clr-secondary-2"
    >
      <span>{file.name}</span>
      <Button
        type="button"
        size="icon"
        className="h-4 w-4 rounded-full bg-transparent text-clr-text-2 hover:bg-transparent
          hover:text-clr-primary"
        onClick={() => onDelete(file.name)}
      >
        <X />
      </Button>
    </div>
  );
};

export const FileUpload: React.FC<Props> = ({
  allowedFiles,
  onChange,
  files,
  multiple = true,
  title,
  preview = false,
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
