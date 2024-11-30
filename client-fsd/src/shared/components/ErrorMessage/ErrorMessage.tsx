import React from 'react';

type Props = {
  errorMessage: string;
};

export const ErrorMessage: React.FC<Props> = ({ errorMessage }) => {
  return (
    <div className="rounded-sm border-[1px] border-red-200 bg-clr-secondary-3/5 px-2 py-4">
      <p className="text-clr-secondary-3">{errorMessage}</p>
    </div>
  );
};
