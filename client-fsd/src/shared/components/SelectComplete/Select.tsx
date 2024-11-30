import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import React from 'react';

type Props<T> = {
  options: Array<T & { id: string; name: string }>;
  placeholder: string;
  onChange?: (v: string) => void;
};

export const SelectComplete = <T extends object>({
  options,
  placeholder,
  onChange,
}: Props<T>) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{placeholder}</SelectLabel>
          {options.map(option => (
            <SelectItem
              value={option.id}
              key={option.name}
            >
              {option?.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
