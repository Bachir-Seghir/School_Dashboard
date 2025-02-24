import { z } from 'zod';

export const parentSchema = z.object({
    id: z.string().optional(),
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long!" })
        .max(20, { message: "Username must be at most 20 characters long!" }),
    email: z.string().email({ message: "Invalid email address" }).optional().or(z.literal("")),
    password: z
        .string()
        .min(8, { message: "Password must be at least 3 characters long!" }).optional().or(z.literal("")),
    firstName: z.string().min(1, { message: "First Name is required!" }),
    lastName: z.string().min(1, { message: "Last Name is required!" }),
    phone: z.string().min(1, { message: "Phone number must be at least 1 digits long!" }),
    address: z.string(),
    studentIds: z.array(z.string()).optional(),
});

export type ParentSchema = z.infer<typeof parentSchema>;
