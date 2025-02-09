'use client';

import React from 'react';
import { Button, Textarea, useToast } from '@/shared/ui';
import { FormInput, ShadowedFrame } from '@/shared/components';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/shared/lib';
import { createContactMessage } from '@/entities/ContactMessage';

type Props = {};

const contactFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(1),
  message: z.string().min(1),
});

type ContactFormSchema = z.infer<typeof contactFormSchema>;

export const ContactForm: React.FC<Props> = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
  });

  const { toast } = useToast();

  const onSubmit: SubmitHandler<ContactFormSchema> = async data => {
    const req = await createContactMessage(data);

    if (req.ok) {
      toast({
        variant: 'successful',
        description: 'Your request was sent',
      });

      reset({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    }

    if (!req.ok) {
      toast({
        variant: 'destructive',
        description: req.message || 'Unexpected error',
      });
    }
  };

  return (
    <ShadowedFrame className="px-[30px] py-10 lg:px-[30px] lg:py-10">
      <form
        id="contact-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-end gap-8">
          <div className="flex flex-wrap gap-4 md:flex-nowrap">
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <FormInput
                    label=""
                    type="text"
                    onChange={onChange}
                    value={value}
                    error={errors.name?.message}
                    placeholder="Enter your name *"
                  />
                );
              }}
            />
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <FormInput
                    label=""
                    type="text"
                    onChange={onChange}
                    value={value}
                    error={errors.email?.message}
                    placeholder="Enter your email *"
                  />
                );
              }}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <FormInput
                    label=""
                    type="text"
                    onChange={onChange}
                    value={value}
                    error={errors.phone?.message}
                    placeholder="Enter your phone *"
                  />
                );
              }}
            />
          </div>
          <Controller
            name="message"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Textarea
                  onChange={onChange}
                  value={value}
                  className={cn(
                    'min-h-[180px] md:min-h-52',
                    errors.message && 'border-clr-secondary-3',
                  )}
                  placeholder="Enter your message"
                />
              );
            }}
          />
          <Button
            type="submit"
            disabled={!isValid}
            loading={isSubmitting}
          >
            Send Message
          </Button>
        </div>
      </form>
    </ShadowedFrame>
  );
};
