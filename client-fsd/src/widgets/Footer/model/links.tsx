import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

type TLinks = {
  name: string;
  href: string;
  icon?: React.ReactNode;
};

const social: Array<TLinks> = [
  {
    name: 'facebook',
    href: 'https://www.facebook.com',
    icon: <Facebook />,
  },
  {
    name: 'twitter',
    href: 'https://www.twitter.com',
    icon: <Twitter />,
  },
  {
    name: 'intagramm',
    href: 'https://www.intagramm.com',
    icon: <Instagram />,
  },
  {
    name: 'linkedin',
    href: 'https://www.linkedin.com',
    icon: <Linkedin />,
  },
];

const quick: Array<TLinks> = [
  {
    name: 'Privacy  Policy',
    href: '/policy',
  },
  {
    name: 'Terms of Use',
    href: '/terms-of-use',
  },
  {
    name: 'FAQ',
    href: '/faq',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
];

const account: Array<TLinks> = [
  {
    name: 'Login / Register',
    href: '/signup',
  },
  {
    name: 'Cart',
    href: '/cart',
  },
  {
    name: 'Wishlist',
    href: '/wishlist',
  },
  {
    name: 'Shop',
    href: '/',
  },
];

export { social, quick, account };
