import { z } from "zod";

export const subjectSchema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().min(1, { message: "Subject name is required!" }),
    teachers: z.array(z.string()) // Teacher Ids
});

export type SubjectSchema = z.infer<typeof subjectSchema>;


export const classSchema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().min(1, { message: "Class name is required!" }),
    capacity: z.coerce.number().min(1, { message: "Capacity is required!" }),
    gradeId: z.coerce.number().min(1, { message: "Grade is required!" }),
    supervisorId: z.string().optional()
});

export type ClassSchema = z.infer<typeof classSchema>;


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


export const studentSchema = z.object({
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
    gradeId: z.coerce.number().min(1, { message: "Grade is required!" }),
    classId: z.coerce.number().min(1, { message: "Class is required!" }),
    parentId: z.string().min(1, { message: "Parent Id is required!" }),
});

export type StudentSchema = z.infer<typeof studentSchema>;