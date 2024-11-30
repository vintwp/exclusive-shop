'use client';

import { cn } from '@/shared/lib';
import { Spinner } from '@/shared/ui';
import React, { useEffect } from 'react';

type Props = {
  fullScreen?: boolean;
  loading?: boolean;
};

export const Overlay: React.FC<Props> = ({
  fullScreen = false,
  loading = false,
}) => {
  useEffect(() => {
    if (fullScreen) {
      document.body.classList.add('overflow-hidden');
    }

    return () => {
      if (fullScreen) {
        document.body.classList.remove('overflow-hidden');
      }
    };
  }, [fullScreen]);

  return (
    <div
      className={cn(
        fullScreen ? 'fixed' : 'absolute',
        'inset-0',
        'z-50',
        'bg-black/50',
      )}
    >
      {loading && (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="text-white/50" />
        </div>
      )}
    </div>
  );
};
