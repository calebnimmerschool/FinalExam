import { Entertainer } from "../types/Entertainer";

interface FetchEntertainersResponse {
    entertainers: Entertainer[];
    totalNumEntertainers: number;
}

// 🔁 Replace this with your actual deployed API URL
const API_URL = "http://localhost:5019/api";

export const fetchEntertainers = async (
    pageSize: number,
    pageNum: number,
    selectedCategories: string[],
    sortOrder: "asc" | "desc"
): Promise<FetchEntertainersResponse> => {
    const categoryParams = selectedCategories.map((cat) => `projectTypes=${encodeURIComponent(cat)}`).join('&');

    const response = await fetch(
        `${API_URL}/Entertainer?pageHowMany=${pageSize}&pageNum=${pageNum}&sortBy=EntStageName&sortOrder=${sortOrder}${
            selectedCategories.length ? `&${categoryParams}` : ''
        }`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch entertainer data");
    }

    const data = await response.json();
    console.log("API Response:", data); // ✅ Log response for debugging

    return data;
};

import { EntertainerInput } from "../types/Entertainer";

export const addEntertainer = async (newEntertainer: EntertainerInput): Promise<Entertainer> => {
    const response = await fetch(`${API_URL}/Entertainer/AddEntertainer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEntertainer)
    });

    if (!response.ok) {
        throw new Error("Failed to add entertainer");
    }

    return await response.json();
};

export const updateEntertainer = async (entertainerId: number, updatedEntertainer: Entertainer): Promise<Entertainer> => {
    try {
        const response = await fetch(`${API_URL}/Entertainer/UpdateEntertainer/${entertainerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedEntertainer)
        });

        return await response.json();
    } catch (error) {
        console.error('Error editing entertainer', error);
        throw error;
    }
};

export const deleteEntertainer = async (entertainerId: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/Entertainer/DeleteEntertainer/${entertainerId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete entertainer');
        }
    } catch (error) {
        console.error('Error deleting entertainer', error);
        throw error;
    }
};
