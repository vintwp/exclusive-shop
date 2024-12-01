/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/shared/ui';
import { X } from 'lucide-react';

type Props = {
  file: File;
  onDelete: (v: string) => void;
  alt: string;
};

export const PreviewImage: React.FC<Props> = ({ file, alt, onDelete }) => {
  const [urlImage, setUrlImage] = useState<string>('');

  useEffect(() => {
    setUrlImage(URL.createObjectURL(file));

    return () => {
      URL.revokeObjectURL(urlImage);
    };
  }, []);

  return (
    <div
      className="relative flex h-[100px] w-[100px] items-center justify-center
        hover:bg-clr-secondary-2"
    >
      {urlImage ? (
        <div className="relative flex h-[70px] w-[70px] items-center justify-center">
          <Image
            src={urlImage}
            alt={alt}
            width={0}
            height={0}
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
      ) : (
        <div className="h-[100px] w-[100px] bg-slate-200" />
      )}
      <div className="absolute right-0 top-0">
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
