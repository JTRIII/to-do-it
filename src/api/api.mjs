
import express, { application } from "express";

import dataStore from "./dataStore/memoryStore.mjs";

const API_NAME = "to-do-it";
const API_VERSION = "0.0.1";

const API_BASE = {
    name: API_NAME,
    version: API_VERSION,
};
Object.freeze(API_BASE);

const LOG_LEVEL = Object.freeze({
    userAgent: true,
    headers: true,
    body: true,
});


export function setup (app) {

    // Add automatic JSON parser
    app.use(express.json());

    // Set API Headers
    app.use((req_, res, next) => {
        res.set({
            "Content-Type": "application/json; charset=utf-8",
        });
        next();
    });

    // Logging Middleware - Log each incoming request to the console
    app.use((req, res_, next) => {
        const date = (new Date()).toISOString();
        console.log("====", date, "================");
        console.log(req.url);
        if (LOG_LEVEL.headers) {
            console.log("-- HTTP Headers:");
            console.dir(req.headers);
        }
        if (LOG_LEVEL.body && req.body) {
            console.log("-- HTTP Body:");
            console.dir(req.body);
        }
        if (LOG_LEVEL.userAgent) {
            console.log("-- User Agent String:");
            console.dir(req.get("User-Agent"));
        }
        next();
    });

    app.get("/api", (req_, res) => {
        res.json({
            api: Object.assign({
                verb: "GET",
                route: "/api",
            }, API_BASE),
            data: {
                message: `API ${API_NAME} version ${API_VERSION}.`,
            },
        });
    });

    app.post("/api/login", async (req, res) => {
        let data = req.body;
        let user;
        try {
            user = await dataStore.login(data.username);
        }
        catch (err) {
            res.status(500).end(err.message);
            return;
        }
        res.json({
            api: Object.assign({
                verb: "POST",
                route: "/api/login",
            }, API_BASE),
            data: user,
        });
    });


    app.get("/api/users/:userId/todos", async (req, res) => {
        const userId = req.params.userId;
        let todos;
        try {
            todos = await dataStore.getTodos(userId);
        }
        catch (err) {
            return res.status(500).end(err.message);
        }
        res.json({
            api: Object.assign({
                verb: "GET",
                route: "/api/users/:userId/todos",
            }, API_BASE),
            data: todos,
        });
    });

    app.post("/api/users/:userId/todos", async (req, res) => {
        const userId = req.params.userId;
        const data = req.body;
        let todo;
        try {
            todo = await dataStore.addTodo(userId, data);
        }
        catch (err) {
            return res.status(500).end(err.message);
        }
        res.json({
            api: Object.assign({
                verb: "POST",
                route: "/api/users/:userId/todos",
            }, API_BASE),
            data: todo,
        });
    });

};


export default {
    setup,
};

