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
    .refine(file => file?.length === 1, 'File is required.'),
  additionalStores: AdditionalStoreOption.array().optional(),
});

type TCategoryFormSchema = z.infer<typeof categoryFormSchema>;

export { categoryFormSchema, type TCategoryFormSchema };
