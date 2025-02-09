import React from 'react';
import { Phone } from 'lucide-react';
import { ShadowedFrame } from '@/shared/components';
import { Contact } from './Contact';

type Props = {};

export const ContactInfo: React.FC<Props> = () => {
  return (
    <ShadowedFrame className="px-[30px] py-10 lg:px-[30px] lg:py-10">
      <div className="flex flex-col gap-8">
        <Contact>
          <Contact.Title>
            <Contact.Icon>
              <Phone width={20} />
            </Contact.Icon>
            <span>Call To Us</span>
          </Contact.Title>
          <Contact.Paragraph>
            We are available 24/7, 7 days a week.
          </Contact.Paragraph>
          <Contact.Paragraph>
            Phone: <a href="tel:+8801611112222">+8801611112222</a>
          </Contact.Paragraph>
        </Contact>
        <div className="h-[1px] w-full bg-black/25" />
        <Contact>
          <Contact.Title>
            <Contact.Icon>
              <Phone width={20} />
            </Contact.Icon>
            <span>Write To US</span>
          </Contact.Title>
          <Contact.Paragraph>
            Fill out our form and we will contact you within 24 hours.
          </Contact.Paragraph>
          <Contact.Paragraph>
            Emails:{' '}
            <a href="mailto:customer@exclusive.com">customer@exclusive.com</a>
          </Contact.Paragraph>
          <Contact.Paragraph>
            Emails:{' '}
            <a href="mailto:support@exclusive.com">support@exclusive.com</a>
          </Contact.Paragraph>
        </Contact>
      </div>
    </ShadowedFrame>
  );
};
