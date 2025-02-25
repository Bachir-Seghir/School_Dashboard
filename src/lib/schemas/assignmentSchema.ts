import { z } from 'zod';

export const assignmentSchema = z.object({
    id: z.coerce.number().optional(),
    title: z.string().min(1, { message: "Assignment title is Required!" }),
    startDate: z.coerce.date({ message: "Assignment start date is required!" }),
    dueDate: z.coerce.date({ message: "Assignment due date is required!" }),
    lessonId: z.coerce.number(),
});

export type AssignmentSchema = z.infer<typeof assignmentSchema>;
