import { z } from 'zod';

export const teacherSchema = z.object({
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
    phone: z.string().optional(),
    address: z.string(),
    bloodType: z.string().min(1, { message: "Blood Type is required!" }),
    birthday: z.coerce.date({ message: "Birthday is required!" }),
    sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
    img: z.string().optional(),
    subjects: z.array(z.string()).optional() // subject Ids
});

export type TeacherSchema = z.infer<typeof teacherSchema>;
