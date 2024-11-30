import Link from 'next/link';
import React from 'react';
import {
  Facebook,
  Instagram,
  SendHorizontal,
  Twitter,
  Linkedin,
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/shared/lib';
import { Button, Container, Input } from '@/shared/ui';
import AppStore from '@/shared/assets/icons/appstore.png';
import GooglePlay from '@/shared/assets/icons/google-play.png';
import Qr from '@/shared/assets/icons/qr-code.jpg';
import { social, account, quick } from '../model/links';

const columnStyle = cn(
  'flex max-w-full md:max-w-[215px] flex-col basis-full md:basis-1/2 lg:flex-auto',
);

const columnTitleStyle = cn('mb-3 text-xl font-medium leading-none lg:mb-6');
const columnRegularTextStyle = cn(
  'mb-2 text-base font-normal leading-normal lg:mb-4 ',
);

const columnRegularTextLinkStyle = cn(
  columnRegularTextStyle,
  'hover:text-clr-secondary-3 transition-colors',
);

export const Footer: React.FC = () => {
  return (
    <div className="bg-black pb-8 pt-5 text-clr-text lg:pb-32 lg:pt-20">
      <Container>
        <div className="flex flex-wrap justify-evenly gap-10 lg:justify-between lg:gap-4">
          <div className={columnStyle}>
            <Link
              href="/"
              className={columnTitleStyle}
            >
              Exclusive
            </Link>
            <p className="mb-3 text-xl font-medium leading-snug lg:mb-6">
              Subscribe
            </p>
            <p className={columnRegularTextStyle}>
              Get 10% off your first order
            </p>
            <Input
              placeholder="Enter your email"
              EndAdornment={<SendHorizontal />}
            />
          </div>
          <div className={columnStyle}>
            <p className={columnTitleStyle}>Support</p>
            <p className={columnRegularTextStyle}>
              111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
            </p>
            <a
              className={columnRegularTextStyle}
              href="mailto:exclusive@gmail.com"
            >
              exclusive@gmail.com
            </a>
            <a
              className={columnRegularTextStyle}
              href="tel:+88015888889999"
            >
              +88015-88888-9999
            </a>
          </div>
          <div className={columnStyle}>
            <p className={columnTitleStyle}>Account</p>
            {account.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={columnRegularTextLinkStyle}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className={columnStyle}>
            <p className={columnTitleStyle}>Quick Link</p>
            {quick.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={columnRegularTextLinkStyle}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className={columnStyle}>
            <p className={columnTitleStyle}>Download App</p>
            <p className="mb-2 text-xs font-medium leading-normal text-clr-secondary/70">
              Save $3 with App New User Only
            </p>
            <div className="mb-6 flex justify-between gap-2">
              <div className="relative overflow-hidden">
                <Image
                  src={Qr}
                  alt="Exclusive QR"
                  height={80}
                  width={80}
                  sizes="100%"
                />
              </div>
              <div className="flex flex-col">
                <div className="relative">
                  <Link
                    href="https://play.google.com/"
                    target="_blank"
                  >
                    <Image
                      src={GooglePlay}
                      alt="Google Store Exclusive"
                      height={35}
                      width={105}
                    />
                  </Link>
                </div>
                <div className="relative mt-auto">
                  <Link
                    href="https://apps.apple.com/"
                    target="_blank"
                  >
                    <Image
                      src={AppStore}
                      alt="AppStore Exclusive"
                      height={35}
                      width={105}
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex gap-3 lg:gap-6">
              {social.map(link => (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="icon"
                  asChild
                >
                  <Link
                    href={link.href}
                    target="_blank"
                  >
                    {link.icon}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
