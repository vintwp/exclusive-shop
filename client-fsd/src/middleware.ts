import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import {
  authConfig,
  DEFAULT_REDIRECT_SIGNIN,
  ADMIN_ROUTE,
} from '@/shared/config';

const { auth } = NextAuth(authConfig);

export default auth(req => {
  const isAuth = req.auth;
  const callbackUrl = req.nextUrl.pathname.slice(1);

  if (
    isAuth &&
    req.auth?.user.role !== 'ADMIN' &&
    ADMIN_ROUTE === req.nextUrl.pathname
  ) {
    return NextResponse.redirect(
      new URL(`${DEFAULT_REDIRECT_SIGNIN}?callbackUrl=${callbackUrl}`, req.url),
    );
  }

  if (!isAuth) {
    return NextResponse.redirect(
      new URL(`${DEFAULT_REDIRECT_SIGNIN}?callbackUrl=${callbackUrl}`, req.url),
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/cart', '/wishlist', '/account/admin/:path*'],
};
