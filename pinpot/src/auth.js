// Filename - auth.js
const API_URL = 'http://localhost:8000';

export async function fetchProtectedData() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/protected`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching protected data:', error);
        throw error; // Rethrow the error if needed
    }
}
