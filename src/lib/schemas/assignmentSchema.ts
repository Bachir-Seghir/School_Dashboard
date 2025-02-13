import { z } from 'zod';

export const assignmentSchema = z.object({

});

export type AssignmentSchema = z.infer<typeof assignmentSchema>;
