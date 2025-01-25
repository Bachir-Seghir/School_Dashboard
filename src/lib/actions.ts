"use server"

import { log } from "util";
import { ClassSchema, SubjectSchema } from "./formValidationSchemas";
import prisma from "./prisma";

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
    console.log('updateClass calles with data:', data);

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