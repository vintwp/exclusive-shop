import React from 'react';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/shared/ui';

type Props = {
  variant: 'instagramm' | 'linkedin' | 'twitter';
  link: string;
};

export const AboutCartSocialButton: React.FC<Props> = ({ variant, link }) => {
  return (
    <Button
      asChild
      size="xxs"
      variant="ghost"
      className="p-[2px] hover:bg-white hover:text-clr-button-2"
    >
      <a
        href={link}
        rel="noopener noreferrer"
        target="_blank"
      >
        {variant === 'instagramm' && <Instagram size={20} />}
        {variant === 'linkedin' && <Linkedin size={20} />}
        {variant === 'twitter' && <Twitter size={20} />}
      </a>
    </Button>
  );
};
