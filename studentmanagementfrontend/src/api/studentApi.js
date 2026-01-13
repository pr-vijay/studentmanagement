import client from "./client";

const studentApi = {
    getAllStudents: async () => {
        try {
            const response = await client.get("/api/students");
            return response.data;
        } catch (error) {
            console.error("Failed to fetch students:", error);
            throw error;
        }
    },

    getStudent: async (id) => {
        try {
            const response = await client.get(`/api/students/${id}`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch student:", error);
            throw error;
        }
    },

    createStudent: async (data) => {
        try {
            const response = await client.post("/api/students", data);
            return response.data;
        } catch (error) {
            console.error("Failed to create student:", error);
            throw error;
        }
    },

    updateStudent: async (id, data) => {
        try {
            const response = await client.put(`/api/students/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Failed to update student:", error);
            throw error;
        }
    },

    deleteStudent: async (id) => {
        try {
            const response = await client.delete(`/api/students/${id}`);
            return response.data;
        } catch (error) {
            console.error("Failed to delete student:", error);
            throw error;
        }
    },
};

export default studentApi;
