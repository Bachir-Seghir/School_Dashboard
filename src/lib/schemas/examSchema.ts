import { z } from 'zod';

export const examSchema = z.object({

});

export type ExamSchema = z.infer<typeof examSchema>;
