"use server";

import prisma from "../prisma";
import { AssignmentSchema } from "../schemas";

type CurrentState = {
    success: boolean;
    error: boolean;
};

// Create Assignment
export const createAssignment = async (currentState: CurrentState, data: AssignmentSchema) => {
    try {
        await prisma.assignment.create({
            data
        })

        return { success: true, error: false }

    } catch (error) {
        console.log(error);
        return { success: false, error: true }
    }
};

// Update Assignment
export const updateAssignment = async (currentState: CurrentState, data: AssignmentSchema) => {
    const { id } = data
    try {
        await prisma.assignment.update({
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
};

// Delete Assignment
export const deleteAssignment = async (currentState: CurrentState, data: FormData) => {
    const id = data.get("id") as string
    try {
        await prisma.assignment.delete({
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
