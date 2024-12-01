import { z } from 'zod';

const AdditionalStoreOption = z.object({
  value: z.string(),
  label: z.string(),
});

const categoryFormSchema = z.object({
  name: z.string().min(1),
  primaryStoreId: z.string().min(1),
  displayOnMainPage: z.boolean().default(false),
  image: z
    .custom<File>()
    .array()
    .superRefine((val, ctx) => {
      if (!val.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Category icon is required',
        });
      }

      if (val.length > 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Should be only 1 icon',
        });
      }

      if (val.length === 1 && val[0].name.split('.')[1] !== 'png') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Icon should be in png',
        });
      }
    }),
  additionalStores: AdditionalStoreOption.array().optional(),
});

type TCategoryFormSchema = z.infer<typeof categoryFormSchema>;

export { categoryFormSchema, type TCategoryFormSchema };
