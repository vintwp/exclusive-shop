'use client';

import { useEffect, useState } from 'react';

export const useAdminDataTableModal = (id: string) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      setOpen(true);
    }
  }, [id]);

  return { open, setOpen };
};
