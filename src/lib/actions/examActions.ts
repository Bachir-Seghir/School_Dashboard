"use server";

import prisma from "../prisma";
import { ExamSchema } from "../schemas";

type CurrentState = {
    success: boolean;
    error: boolean;
};

// Create Exam
export const createExam = async (currentState: CurrentState, data: ExamSchema) => {
    try {
        await prisma.exam.create({
            data: {
                title: data.title,
                startTime: data.startTime,
                endTime: data.endTime,
                lessonId: data.lessonId,
            }
        })

        return { success: true, error: false }

    } catch (error) {
        console.log(error);
        return { success: false, error: true }
    }
};

// Update Exam
export const updateExam = async (currentState: CurrentState, data: ExamSchema) => {
    const { id } = data
    try {
        await prisma.exam.update({
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
// Delete Exam
export const deleteExam = async (currentState: CurrentState, data: FormData) => {
    const id = data.get("id") as string
    try {
        await prisma.exam.delete({
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
