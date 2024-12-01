import { Button } from '@/shared/ui';
import { X } from 'lucide-react';
import React from 'react';

type Props = {
  file: File;
  onDelete: (v: string) => void;
};

export const FileName: React.FC<Props> = ({ file, onDelete }) => {
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
