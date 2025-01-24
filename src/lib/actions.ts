"use server"

import { SubjectSchema } from "./formValidationSchemas";
import prisma from "./prisma";

type CurrentState = {
    success: boolean
    error: boolean
}

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