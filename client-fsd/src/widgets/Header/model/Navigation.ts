type TNavigationLink = {
  url: string;
  name: string;
};

export const navigation: TNavigationLink[] = [
  {
    url: '/',
    name: 'Home',
  },
  {
    url: '/contact',
    name: 'Contact',
  },
  {
    url: '/about',
    name: 'About',
  },

  {
    url: '/api/auth/signup',
    name: 'Sing Up',
  },
];
