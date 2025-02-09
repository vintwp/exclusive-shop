/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/shared/ui';
import { cn } from '@/shared/lib';

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  label?: string;
  value?: string;
  placeholder?: string;
  error?: string;
  onChange?: (v: string) => void;
};

export const FormInput: React.FC<Props> = ({
  label,
  value,
  placeholder,
  onChange,
  error,
  ...props
}) => {
  const [val, setVal] = useState<string>(value || '');
  const [prevVal, setPrevVal] = useState<string>(value || '');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyPressed = e.key;

    if (keyPressed === 'Escape') {
      setVal(prevVal);
      if (onChange) {
        onChange(prevVal);
      }

      inputRef.current?.blur();
    }

    if (keyPressed === 'Enter') {
      setPrevVal(val);
    }
  };

  const handleOnBlur = () => {
    if (val !== prevVal) {
      setPrevVal(val);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  useEffect(() => {
    if (value || value === '') {
      setVal(value);
    }
  }, [value]);

  return (
    <label className="w-full">
      {label && <p className="mb-2 text-sm font-semibold">{label}</p>}
      <Input
        {...props}
        className={cn(
          'bg-clr-secondary-2 text-clr-text-2',
          'focus-within:bg-white focus-within:text-black',
          error && 'border-clr-secondary-3',
        )}
        value={val}
        onChange={handleOnChange}
        onKeyDown={handleKeydown}
        onBlur={handleOnBlur}
        ref={inputRef}
        placeholder={placeholder}
      />
      {error && (
        <p className="mt-2 px-1 text-xs text-clr-secondary-3">{error}</p>
      )}
    </label>
  );
};
