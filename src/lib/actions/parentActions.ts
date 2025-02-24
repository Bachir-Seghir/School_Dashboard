"use server";

import { clerkClient } from "@clerk/nextjs/server";
import prisma from "../prisma";
import { ParentSchema } from "../schemas";

type CurrentState = {
    success: boolean;
    error: boolean;
};

// Create Parent
export const createParent = async (currentState: CurrentState, data: ParentSchema) => {
    try {
        const client = await clerkClient()
        const user = await client.users.createUser({
            username: data.username,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            publicMetadata: {
                role: "parent"
            }
        })
        await prisma.parent.create({
            data: {
                id: user.id,
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email || "",
                phone: data.phone,
                address: data.address,
                students: {
                    connect: data.studentIds?.map(studentId => ({
                        id: studentId // Prisma expects a string for ID
                    })) || []
                }
            }
        })

        return { success: true, error: false }

    } catch (error) {
        console.log(error);
        return { success: false, error: true }
    }

};

// Update Parent
export const updateParent = async (currentState: CurrentState, data: ParentSchema) => {
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
        await prisma.parent.update({
            where: { id: data.id },
            data: {
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                students: {
                    connect: data.studentIds?.map(studentId => ({
                        id: studentId // Prisma expects a string for ID
                    })) || []
                }
            }
        })

        return { success: true, error: false }

    } catch (error) {
        console.log(error);
        return { success: false, error: true }
    }

};

// Delete Parent
export const deleteParent = async (currentState: CurrentState, data: FormData) => {
    const id = data.get("id") as string
    try {
        // delete user from clerk
        const client = await clerkClient()
        await client.users.deleteUser(id)

        // delete the parent
        await prisma.parent.delete({
            where: { id }
        })

        return { success: true, error: false }

    } catch (error) {
        console.log(error);
        return { success: false, error: true }
    }
};
