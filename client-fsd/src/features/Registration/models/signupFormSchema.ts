import { z } from 'zod';

export const signupSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(4, { message: 'Must be 4 or more characters long' })
      .max(20, { message: 'Must be 20 or fewer characters long' }),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type TSignupSchema = z.infer<typeof signupSchema>;
