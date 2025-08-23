import { z } from 'zod';

// JSONPlaceholder /posts/1 response schema
export const defaultApiResponseSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

export type DefaultApiResponse = z.infer<typeof defaultApiResponseSchema>;
