
const SERVER = "0.0.0.0";
const PROTOCOL = "http";
const PORT = "47900";

const HEADER_BASE = Object.freeze({
    "Content-Type": "application/json; charset=utf-8",
    "Accept": "application/json",
});


export const api = {
    async get(route) {
        const url = `${PROTOCOL}://${SERVER}:${PORT}${route}`;
        let fetchResult = await fetch(url, {
            method: "GET",
            headers: HEADER_BASE,
        });
        result = await fetchResult.json();
        return result;
    },
    async post(route, data) {
        const url = `${PROTOCOL}://${SERVER}:${PORT}${route}`;
        let fetchResult = await fetch(url, {
            method: "POST",
            headers: HEADER_BASE,
            body: JSON.stringify(data, null, 4),
        });
        result = await fetchResult.json();
        return result;
    },
    async put(route, data) {
        const url = `${PROTOCOL}://${SERVER}:${PORT}${route}`;
        let fetchResult = await fetch(url, {
            method: "PUT",
            headers: HEADER_BASE,
            body: JSON.stringify(data, null, 4),
        });
        result = await fetchResult.json();
        return result;
    },
    async delete(route) {
        const url = `${PROTOCOL}://${SERVER}:${PORT}${route}`;
        let fetchResult = await fetch(url, {
            method: "DELETE",
            headers: HEADER_BASE,
        });
        result = await fetchResult.json();
        return result;
    },
};

export default {
    api,
};


