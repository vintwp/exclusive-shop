import React from 'react';

type Props = {
  isNew: boolean;
};

export const NewItemTag: React.FC<Props> = ({ isNew }) => {
  return isNew ? (
    <div className="rounded-sm bg-clr-button px-3 py-1 text-xs leading-none text-white">
      NEW
    </div>
  ) : null;
};
