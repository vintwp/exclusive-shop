'use client';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui';
import React from 'react';

type Props = {
  title: string;
  submitButtonTitle: string;
  id: string;
  open: boolean;
  onOpenChange: (value: boolean) => void;
  isLoading?: boolean;
  isDisable?: boolean;
  description?: string;
  children: React.ReactNode;
};

export const AdminDataTableCreateButton = ({ ...props }) => {
  return (
    <div className="px-4 py-2">
      <Button
        size="xxs"
        {...props}
      >
        Create +
      </Button>
    </div>
  );
};

export const AdminDataTableModal: React.FC<Props> = ({
  title,
  submitButtonTitle,
  description,
  id,
  open,
  onOpenChange,
  isLoading = false,
  isDisable = true,
  children,
}) => {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description || null}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{children}</div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              size="sm"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            type="submit"
            size="sm"
            form={id}
            loading={isLoading}
            disabled={isDisable}
          >
            {submitButtonTitle}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
