"use server";

import prisma from "../prisma";
import { LessonSchema } from "../schemas";

type CurrentState = {
    success: boolean;
    error: boolean;
};

// Create Lesson
export const createLesson = async (currentState: CurrentState, data: LessonSchema) => {
    try {
        await prisma.lesson.create({
            data
        })
        return { success: true, error: false }

    } catch (error) {
        console.log(error);
        return { success: false, error: true }
    }
};

// Update Lesson
export const updateLesson = async (currentState: CurrentState, data: LessonSchema) => {
    const { id } = data

    try {
        await prisma.lesson.update({
            where: { id },
            data
        })
        return { success: true, error: false }

    } catch (error) {
        console.log(error);
        return { success: false, error: true }
    }
};

// Delete Lesson
export const deleteLesson = async (currentState: CurrentState, data: FormData) => {
    const id = data.get("id") as string
    try {
        await prisma.lesson.delete({
            where: {
                id: parseInt(id)
            }
        })

        return { success: true, error: false }

    } catch (error) {
        console.log(error);
        return { success: false, error: true }
    }
};
