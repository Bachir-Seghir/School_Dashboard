"use server";

import { clerkClient } from "@clerk/nextjs/server";
import prisma from "../prisma";
import { StudentSchema } from "../schemas";

type CurrentState = {
    success: boolean;
    error: boolean;
};

// Create Student
export const createStudent = async (currentState: CurrentState, data: StudentSchema) => {

    try {
        const classItem = await prisma.class.findUnique({
            where: { id: data.classId },
            include: {
                _count: {
                    select: {
                        students: true
                    }
                }
            }
        })

        if (classItem?.capacity === classItem?._count.students) {
            return { success: false, error: true }
        }

        const client = await clerkClient()
        const user = await client.users.createUser({
            username: data.username,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            publicMetadata: {
                role: "student"
            }
        })
        await prisma.student.create({
            data: {
                id: user.id,
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                img: data.img,
                bloodType: data.bloodType,
                sex: data.sex,
                birthday: data.birthday,
                gradeId: data.gradeId,
                classId: data.classId,
                parentId: data.parentId,
            }
        })

        return { success: true, error: false }

    } catch (error) {
        console.log(error);
        return { success: false, error: true }
    }
}

// Update Student
export const updateStudent = async (currentState: CurrentState, data: StudentSchema) => {

    if (!data.id) {
        return { success: false, error: true }
    }
    try {
        const client = await clerkClient()
        const user = await client.users.updateUser(data.id, {
            username: data.username,
            ...(data.password !== "" && { password: data.password }),
            firstName: data.firstName,
            lastName: data.lastName,
        })
        await prisma.student.update({
            where: { id: data.id },
            data: {
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                img: data.img,
                bloodType: data.bloodType,
                sex: data.sex,
                birthday: data.birthday,
                gradeId: data.gradeId,
                classId: data.classId,
                parentId: data.parentId,
            }
        })

        return { success: true, error: false }

    } catch (error) {
        console.log(error);
        return { success: false, error: true }
    }

}

// Delete Student
export const deleteStudent = async (currentState: CurrentState, data: FormData) => {

    const id = data.get("id") as string
    try {
        // delete user from clerk
        const client = await clerkClient()
        await client.users.deleteUser(id)

        // TODO : Delete related attendances, and results linked to this student

        // delete the student
        await prisma.student.delete({
            where: { id }
        })

        return { success: true, error: false }

    } catch (error) {
        console.log(error);
        return { success: false, error: true }
    }

}
