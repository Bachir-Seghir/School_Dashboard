"use server";

import prisma from "../prisma";
import { ClassSchema } from "../schemas";

type CurrentState = {
    success: boolean;
    error: boolean;
};

// Create Class
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

// Update Class
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

// Delete Class
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