import { z } from 'zod';

export const announcementSchema = z.object({
    id: z.coerce.number().optional(),
    title: z.string().min(1, { message: "Announcment title is Required!" }),
    description: z.string().optional(),
    date: z.coerce.date({ message: "Announcment date is required!" }),
    classId: z.coerce.number().optional(),
});

export type AnnouncementSchema = z.infer<typeof announcementSchema>;
