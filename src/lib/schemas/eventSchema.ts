import { z } from 'zod';

export const eventSchema = z.object({
    id: z.coerce.number().optional(),
    title: z.string().min(1, { message: "Event Title is required!" }),
    description: z.string().optional(),
    startTime: z.coerce.date({ message: "Start Time is required!" }),
    endTime: z
        .string()
        .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid time format (HH:mm)"),
    classId: z.coerce.number().optional(),
});

export type EventSchema = z.infer<typeof eventSchema>;
