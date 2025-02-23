"use server";

import prisma from "../prisma";
import { ResultSchema } from "../schemas";

type CurrentState = {
    success: boolean;
    error: boolean;
};

// Create Result
export const createResult = async (currentState: CurrentState, data: ResultSchema) => {
    try {
        await prisma.result.create({
            data: {
                id: data.id,
                score: data.score,
                studentId: data.studentId,
                examId: data.examId || null,
                assignmentId: data.assignmentId || null
            }
        })

        return { success: true, error: false }

    } catch (error) {
        console.log(error);
        return { success: false, error: true }
    }
};

// Update Result
export const updateResult = async (currentState: CurrentState, data: ResultSchema) => {
    const { id } = data
    try {
        await prisma.result.update({
            where: {
                id
            },
            data: {
                id: data.id,
                score: data.score,
                studentId: data.studentId,
                examId: data.examId || null,
                assignmentId: data.assignmentId || null
            }
        })

        return { success: true, error: false }

    } catch (error) {
        console.log(error);
        return { success: false, error: true }
    }
};

// Delete Result
export const deleteResult = async (currentState: CurrentState, data: FormData) => {
    const id = data.get("id") as string
    try {
        await prisma.result.delete({
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
