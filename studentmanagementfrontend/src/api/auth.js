import client from "./client";

export function setBasicAuth(username, password) {
    const token = btoa(`${username}:${password}`);
    client.defaults.headers.common["Authorization"] = `Basic ${token}`;
    const authData = { username, password };
    localStorage.setItem("auth", JSON.stringify(authData));
}

export function clearAuth() {
    delete client.defaults.headers.common["Authorization"];
    localStorage.removeItem("auth");
}

export function getAuth() {
    const authData = localStorage.getItem("auth");
    return authData ? JSON.parse(authData) : null;
}

export function isAuthenticated() {
    return !!getAuth();
}
