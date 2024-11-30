import { z } from 'zod';

const errorMessageStringNotEmpty = "Field can't be empty";

export const editFormSchema = z
  .object({
    name: z.string().min(1, errorMessageStringNotEmpty),
    lastName: z.string().min(1, errorMessageStringNotEmpty),
    email: z.string().email({ message: 'Invalid email address' }),
    adress: z.string().min(1, errorMessageStringNotEmpty),
    password: z.string().optional(),
    newPassword: z.string().optional(),
    newConfirmPassword: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.password && !values.newPassword && !values.newConfirmPassword) {
      ctx.addIssue({
        message: errorMessageStringNotEmpty,
        code: z.ZodIssueCode.custom,
        path: ['newPassword'],
      });
      ctx.addIssue({
        message: errorMessageStringNotEmpty,
        code: z.ZodIssueCode.custom,
        path: ['newConfirmPassword'],
      });
    }

    if (values.password && values.newPassword && !values.newConfirmPassword) {
      ctx.addIssue({
        message: errorMessageStringNotEmpty,
        code: z.ZodIssueCode.custom,
        path: ['newConfirmPassword'],
      });
    }

    if (values.password && !values.newPassword && values.newConfirmPassword) {
      ctx.addIssue({
        message: errorMessageStringNotEmpty,
        code: z.ZodIssueCode.custom,
        path: ['newPassword'],
      });
    }

    if (values.password && values.newPassword !== values.newConfirmPassword) {
      ctx.addIssue({
        message: "Passwords don't match",
        code: z.ZodIssueCode.custom,
        path: ['newConfirmPassword'],
      });
    }
  });

export type TEditSchema = z.infer<typeof editFormSchema>;
