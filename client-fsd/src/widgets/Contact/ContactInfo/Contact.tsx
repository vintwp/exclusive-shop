import React from 'react';
import { cn } from '@/shared/lib';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Contact = ({ children, className }: Props) => {
  return <div className={className}>{children}</div>;
};

const ContactTitle = ({ children, className }: Props) => (
  <div
    className={cn(
      'mb-6 flex items-center gap-4 text-base font-medium text-black',
      className,
    )}
  >
    {children}
  </div>
);

Contact.Title = ContactTitle;

const ContactIcon = ({ children, className }: Props) => (
  <div
    className={cn(
      `flex h-10 w-10 items-center justify-center rounded-full bg-clr-secondary-3
      text-white`,
      className,
    )}
  >
    {children}
  </div>
);

Contact.Icon = ContactIcon;

const ContactParagraph = ({ children, className }: Props) => (
  <div
    className={cn(
      'text-sm leading-normal [&:not(:last-child)]:mb-4',
      className,
    )}
  >
    {children}
  </div>
);

Contact.Paragraph = ContactParagraph;

export { Contact };
