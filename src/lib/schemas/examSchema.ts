import { z } from 'zod';

export const examSchema = z.object({
    id: z.coerce.number().optional(),
    title: z.string().min(1, { message: "Exam Title is required!" }),
    startTime: z.coerce.date({ message: "Start Time is required!" }),
    endTime: z.coerce.date({ message: "End Time is required!" }),
    lessonId: z.coerce.number(),
});

export type ExamSchema = z.infer<typeof examSchema>;
