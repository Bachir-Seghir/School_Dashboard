import { z } from 'zod';

export const eventSchema = z.object({

});

export type EventSchema = z.infer<typeof eventSchema>;
