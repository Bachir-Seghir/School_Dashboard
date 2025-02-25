import { z } from 'zod';

export const resultSchema = z.object({
    id: z.coerce.number().optional(),
    score: z.coerce.number(),
    examId: z.coerce.number().optional(),
    assignmentId: z.coerce.number().optional(),
    studentId: z.string(),
});

export type ResultSchema = z.infer<typeof resultSchema>;
