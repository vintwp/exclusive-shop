import { Container } from '@/shared/ui';
import React from 'react';
import { SearchProduct } from '@/features/SearchProduct';
import { auth } from '@/shared/config';
import { HeaderLogo } from './Logo';
import { Navbar } from './Navbar';
import { CartButton } from './CartButton';
import { WishlistButton } from './WishlistButton';
import { MobileNavigation } from './MobileNavbar';
import { AccoundDropdown } from './AccountDropdown';

export const Header: React.FC = async () => {
  const isAuth = await auth();

  return (
    <header className="border-b-[1px] border-clr-text-2/25 pb-4 pt-4 md:pt-10">
      <Container>
        <div className="flex items-center justify-between gap-2">
          <div className="text-lg font-bold leading-none md:text-2xl">
            <HeaderLogo />
          </div>
          <div className="ml-[12%] hidden md:block">
            <Navbar />
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <SearchProduct className="mr-2" />
            <div className="flex md:hidden">
              <MobileNavigation />
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 md:flex">
                <CartButton />
                <WishlistButton />
              </div>
              {isAuth && <AccoundDropdown name={isAuth.user.name || ''} />}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};
