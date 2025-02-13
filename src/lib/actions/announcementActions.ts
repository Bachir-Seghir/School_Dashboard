"use server";

import prisma from "../prisma";
import { AnnouncementSchema } from "../schemas";

type CurrentState = {
    success: boolean;
    error: boolean;
};

// Create Announcement
export const createAnnouncement = async (currentState: CurrentState, data: AnnouncementSchema) => {
    try {
        await prisma.announcement.create({
            data: {
                title: data.title,
                date: data.date,
                description: data.description ?? "",
                classId: data.classId || null,
            }
        })

        return { success: true, error: false }

    } catch (error) {
        console.log(error);
        return { success: false, error: true }
    }
};

// Update Announcement
export const updateAnnouncement = async (currentState: CurrentState, data: AnnouncementSchema) => {
    const { id } = data
    try {
        await prisma.announcement.update({
            where: {
                id
            },
            data: {
                title: data.title,
                date: data.date,
                description: data.description ?? "",
                classId: data.classId || null,
            }
        })

        return { success: true, error: false }

    } catch (error) {
        console.log(error);
        return { success: false, error: true }
    }
};

// Delete Announcement
export const deleteAnnouncement = async (currentState: CurrentState, data: FormData) => {
    const id = data.get("id") as string
    try {
        await prisma.announcement.delete({
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
