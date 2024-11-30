import React from 'react';
import { Button } from '@/shared/ui';
import Link from 'next/link';
import { ActionButton } from '../../model/ActionButtons';

export const CartButton: React.FC = () => {
  return (
    <Button
      variant="ghost"
      size="icon"
      asChild
    >
      <Link href={ActionButton.cart.url}>{ActionButton.cart.icon}</Link>
    </Button>
  );
};
