"use server";

type CurrentState = {
    success: boolean;
    error: boolean;
};

// Create Event
export const createEvent = async (currentState: CurrentState, data: any) => {
    // TODO: Implement create function
};

// Update Event
export const updateEvent = async (currentState: CurrentState, data: any) => {
    // TODO: Implement update function
};

// Delete Event
export const deleteEvent = async (currentState: CurrentState, data: FormData) => {
    // TODO: Implement delete function
};
