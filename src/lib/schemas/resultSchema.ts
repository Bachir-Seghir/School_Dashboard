import { z } from 'zod';

export const resultSchema = z.object({

});

export type ResultSchema = z.infer<typeof resultSchema>;
