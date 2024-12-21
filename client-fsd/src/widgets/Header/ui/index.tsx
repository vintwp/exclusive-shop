import { Container } from '@/shared/ui';
import React from 'react';
import { auth } from '@/shared/config';
import { GlobalSearch } from '@/features/GlobalSearch';
import { HeaderLogo } from './Logo';
import { Navbar } from './Navbar';
import { CartButton } from './CartButton';
import { WishlistButton } from './WishlistButton';
import { MobileNavigation } from './MobileNavbar';
import { AccoundDropdown } from './AccountDropdown';

export const Header: React.FC = async () => {
  const isAuth = await auth();

  return (
    <header className="relative border-b-[1px] border-clr-text-2/25 pb-4 pt-4 md:pt-10">
      <Container>
        <div className="flex items-center justify-between gap-8 lg:gap-2">
          <div className="text-lg font-bold leading-none md:text-2xl">
            <HeaderLogo />
          </div>
          <div className="hidden md:block lg:ml-[12%]">
            <Navbar />
          </div>
          <div className="flex w-full max-w-[33%] items-center justify-end gap-2 lg:gap-4">
            <GlobalSearch className="flex flex-1 justify-end" />
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
