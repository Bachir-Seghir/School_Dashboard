import { z } from 'zod';

export const lessonSchema = z.object({

});

export type LessonSchema = z.infer<typeof lessonSchema>;
