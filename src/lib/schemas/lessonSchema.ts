import { Day } from '@prisma/client';
import { z } from 'zod';

export const lessonSchema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().min(4, { message: "Lesson name is required!" }),
    day: z.nativeEnum(Day, { message: "Lesson Day is Required!" }),
    startTime: z.coerce.date({ message: "Lesson start time is Required!" }),
    endTime: z.coerce.date({ message: "Lesson end time is Required!" }),
    classId: z.coerce.number(),
    subjectId: z.coerce.number(),
    teacherId: z.string(),
});

export type LessonSchema = z.infer<typeof lessonSchema>;
