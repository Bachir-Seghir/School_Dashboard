"use server";

import prisma from "../prisma";
import { EventSchema } from "../schemas";

type CurrentState = {
    success: boolean;
    error: boolean;
};

// Create Event
export const createEvent = async (currentState: CurrentState, data: EventSchema) => {
    try {
        await prisma.event.create({
            data: {
                title: data.title,
                startTime: data.startTime,
                endTime: data.endTime,
                description: data.description || "",
                classId: data.classId || null,
            }
        })

        return { success: true, error: false }

    } catch (error) {
        console.log(error);
        return { success: false, error: true }
    }
};

// Update Event
export const updateEvent = async (currentState: CurrentState, data: any) => {
    const { id } = data
    try {
        await prisma.event.update({
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

// Delete Event
export const deleteEvent = async (currentState: CurrentState, data: FormData) => {
    const id = data.get("id") as string
    try {
        await prisma.event.delete({
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
