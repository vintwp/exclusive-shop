import { Checkbox } from '@/shared/ui';
import React, { useId } from 'react';
import { CheckboxProps } from '@radix-ui/react-checkbox';

type Props = CheckboxProps & {
  title: string;
};

export const CheckboxLabeled: React.FC<Props> = ({ title, ...props }) => {
  const id = useId();

  return (
    <div className="flex items-center gap-2 text-sm">
      <Checkbox
        id={id}
        {...props}
      />
      <label htmlFor={id}>{title}</label>
    </div>
  );
};
