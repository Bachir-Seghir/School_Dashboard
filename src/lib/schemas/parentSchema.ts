import { z } from 'zod';

export const parentSchema = z.object({

});

export type ParentSchema = z.infer<typeof parentSchema>;
