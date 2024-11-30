import Link from 'next/link';
import React from 'react';

export const HeaderLogo: React.FC = () => {
  return (
    <Link
      href="/"
      className="hover:text-clr-secondary-3"
    >
      Exclusive
    </Link>
  );
};
