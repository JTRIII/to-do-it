import api from "./api.mjs";

const LOGGING = {
    arguments: true,
    result: true,
};


function logArguments(name, args) {
    if (LOGGING.arguments && args) {
        console.log(`Service.${name} Arguments:`);
        console.dir(args);
    }
}
function logResult(name, data) {
    if (LOGGING.result && data) {
        console.log(`Service.${name} API Result`);
        console.dir(data);
    }
}


export async function login(username) {
    logArguments("login", arguments)
    const data = await api.post("/login", {
        username,
    });
    logResult("login", data);
    return data;
    
}


export async function getTodos(userId) {
    logArguments("getTodos", arguments);
    const data = await api.get(`/users/${userId}/todos`);
    logResult("getTodos", data);
    return data;
}


export async function addTodo(userId, todo) {
    logArguments("addTodo", arguments);
    const data = await api.post(`/users/${userId}/todos`, todo);
    logResult("addTodo", data);
    return data;
}


export async function editTodo(userId, todoId, updates) {
    logArguments("editTodo", arguments);
    const data = await api.put(`/users/${userId}/todos/${todoId}`, updates);
    logResult("editTodo", data);
    return data;
}


export async function deleteTodo(userId, todoId) {
    logArguments("deleteTodo", arguments);
    const data = await api.delete(`/users/${userId}/todos/${todoId}`);
    logResult("deleteTodo", data);
    return data;
}


export default {
    login,
    getTodos,
    addTodo,
    editTodo,
    deleteTodo,
};








