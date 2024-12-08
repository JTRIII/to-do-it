
import { nanoid } from "nanoid";

import { validateTodo } from "./validators/todoValidator.mjs";

const usersByUsername = new Map();
const usersByUserId = new Map();

const todosByUserId = new Map();


export async function login(username) {
    let user = usersByUsername.get(username);
    if (user) return Promise.resolve(user);
    const id = nanoid();
    user = {
        id,
        username,
    };
    usersByUsername.set(username, user);
    usersByUserId.set(user.id, user);
    return Promise.resolve(user);
}

export async function getTodos(userId) {
    const user = usersByUserId.get(userId);
    if (!user) return Promise.reject(new Error("getTodos - User does not exist."));
    let todos = todosByUserId.get(userId);
    if (todos) return Promise.resolve(Object.fromEntries(todos));
    todos = new Map();
    todosByUserId.set(userId, todos);
    return Promise.resolve(Object.fromEntries(todos));
}

export async function addTodo(userId, todo) {
    const user = usersByUserId.get(userId);
    if (!user) return Promise.reject(new Error("addTodo - User does not exist."));
    try {
        todo = validateTodo(todo);
    }
    catch (err) {
        return Promise.reject(err);
    }
    todo.id = nanoid();
    let todos = todosByUserId.get(userId);
    if (!todos) {
        todos = new Map();
        todosByUserId.set(userId, todos);
    }
    todos.set(todo.id, todo);
    return Promise.resolve(todo);
}

export default {
    login,
    getTodos,
    addTodo,
};
