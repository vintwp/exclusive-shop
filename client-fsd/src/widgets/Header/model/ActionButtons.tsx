import { Heart, ShoppingCart } from 'lucide-react';

type TActionButtonTypes = 'cart' | 'wishlist';

type TActionButton = {
  [k in TActionButtonTypes]: {
    icon: React.ReactNode;
    url: string;
  };
};

export const ActionButton: TActionButton = {
  cart: {
    icon: <ShoppingCart />,
    url: '/cart',
  },

  wishlist: {
    icon: <Heart />,
    url: '/wishlist',
  },
};
