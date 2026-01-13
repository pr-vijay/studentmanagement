import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Apply stored auth (persisted login)
const storedAuth = localStorage.getItem("auth");
if (storedAuth) {
    const { username, password } = JSON.parse(storedAuth);
    const token = btoa(`${username}:${password}`);
    client.defaults.headers.common["Authorization"] = `Basic ${token}`;
}

// Add response interceptor for error handling
client.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default client;
