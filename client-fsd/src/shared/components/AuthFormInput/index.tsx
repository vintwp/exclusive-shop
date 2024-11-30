import React, { useId } from 'react';
import { cn } from '@/shared/lib';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  errorMessage?: string;
};

const inputClassname = cn(
  'peer',
  'block',
  'w-full',
  'px-1',
  'appearance-none',
  'border-0',
  'border-b-2',
  'border-gray-300',
  'bg-transparent',
  'py-2.5',
  'text-sm',
  'text-gray-900',
  'focus:border-black',
  'focus:outline-none',
  'focus:ring-0',
  'text-base',
);

const labelClassname = cn(
  'absolute',
  'top-3',
  '-z-10',
  'origin-[0]',
  '-translate-y-8',
  'scale-75',
  'transform',
  'text-sm',
  'text-gray-500',
  'duration-300',
  'peer-placeholder-shown:translate-y-0',
  'peer-placeholder-shown:scale-100',
  'peer-focus:start-0',
  'peer-focus:-translate-y-8',
  'peer-focus:scale-75',
);

const AuthFormInput = React.forwardRef<HTMLInputElement, Props>(
  ({ errorMessage = '', ...props }, ref) => {
    const id = useId();

    return (
      <div className="relative z-0">
        <div className="relative">
          <input
            type={props?.type || 'text'}
            id={id}
            className={cn(
              inputClassname,
              errorMessage && 'border-clr-button-2',
              errorMessage && 'focus:border-clr-button-2',
            )}
            {...props}
            placeholder=" "
            ref={ref}
          />
          <label
            htmlFor={id}
            className={cn(labelClassname, errorMessage && 'text-clr-button-2')}
          >
            {props?.placeholder}
          </label>
        </div>

        {errorMessage && errorMessage && (
          <p className="mt-2 text-xs text-clr-button-2">{errorMessage}</p>
        )}
      </div>
    );
  },
);

AuthFormInput.displayName = 'Input';

export { AuthFormInput };
