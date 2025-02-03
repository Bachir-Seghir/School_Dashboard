"use server"

import { ClassSchema, SubjectSchema, TeacherSchema } from "./formValidationSchemas";
import prisma from "./prisma";
import { clerkClient } from "@clerk/nextjs/server";

type CurrentState = {
    success: boolean
    error: boolean
}

// Subject Actions
export const createSubject = async (currentState: CurrentState, data: SubjectSchema) => {

    const { name, teachers } = data
    try {
        await prisma.subject.create({
            data: {
                name,
                teachers: {
                    connect: teachers.map((teacherId) => ({ id: teacherId }))
                }
            }
        })

        return { success: true, error: false }

    } catch (error) {
        console.log(error);
        return { success: false, error: true }
    }

}
export const updateSubject = async (currentState: CurrentState, data: SubjectSchema) => {

    const { id, name, teachers } = data
    try {
        await prisma.subject.update({
            where: {
                id
            },
            data: {
                name,
                teachers: {
                    set: teachers.map((teacherId) => ({ id: teacherId }))
                }
            }
        })

        return { success: true, error: false }

    } catch (error) {
        console.log(error);
        return { success: false, error: true }
    }

}
export const deleteSubject = async (currentState: CurrentState, data: FormData) => {

    const id = data.get("id") as string
    try {
        await prisma.subject.delete({
            where: {
                id: parseInt(id)
            }
        })

        return { success: true, error: false }

    } catch (error) {
        console.log(error);
        return { success: false, error: true }
    }

}

// Class Actions
export const createClass = async (currentState: CurrentState, data: ClassSchema) => {
    try {
        await prisma.class.create({
            data
        })

        return { success: true, error: false }

    } catch (error) {
        console.log(error);
        return { success: false, error: true }
    }

}
export const updateClass = async (currentState: CurrentState, data: ClassSchema) => {

    const { id } = data
    try {
        await prisma.class.update({
            where: {
                id
            },
            data
        })

        return { success: true, error: false }

    } catch (error) {
        console.log(error);
        return { success: false, error: true }
    }

}
export const deleteClass = async (currentState: CurrentState, data: FormData) => {

    const id = data.get("id") as string
    try {
        await prisma.class.delete({
            where: {
                id: parseInt(id)
            }
        })

        return { success: true, error: false }

    } catch (error) {
        console.log(error);
        return { success: false, error: true }
    }

}
// Teacher Actions
export const createTeacher = async (currentState: CurrentState, data: TeacherSchema) => {
    try {
        const client = await clerkClient()
        const user = await client.users.createUser({
            username: data.username,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            publicMetadata: {
                role: "teacher"
            }
        })
        await prisma.teacher.create({
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
                subjects: {
                    connect: data.subjects?.map(subjectId => ({
                        id: parseInt(subjectId)
                    }))
                }
            }
        })

        return { success: true, error: false }

    } catch (error) {
        console.log(error);
        return { success: false, error: true }
    }

}
export const updateTeacher = async (currentState: CurrentState, data: TeacherSchema) => {

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
        await prisma.teacher.update({
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
                subjects: {
                    set: data.subjects?.map(subjectId => ({
                        id: parseInt(subjectId)
                    }))
                }
            }
        })

        return { success: true, error: false }

    } catch (error) {
        console.log(error);
        return { success: false, error: true }
    }

}
export const deleteTeacher = async (currentState: CurrentState, data: FormData) => {

    const id = data.get("id") as string
    try {

        // Delete related assignments, attendances, and exams linked to lessons of this teacher
        await prisma.$transaction(async (prisma) => {
            await prisma.assignment.deleteMany({
                where: { lesson: { teacherId: id } }
            });
            await prisma.attendance.deleteMany({
                where: { lesson: { teacherId: id } }
            });
            await prisma.exam.deleteMany({
                where: { lesson: { teacherId: id } }
            });

            // delete lesson associated with this teacher 
            await prisma.lesson.deleteMany({
                where: { teacherId: id }
            })

            // delete the teacher
            await prisma.teacher.delete({
                where: { id }
            })
        })

        return { success: true, error: false }

    } catch (error) {
        console.log(error);
        return { success: false, error: true }
    }

}