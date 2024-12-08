

export function validateTodo(todo, validateId=false) {

    if (validateId && (typeof todo.id !== "string" || !/^[/w_-]{21}$/.test(todo.id))) {
        throw new Error("validateTodo - Todo id must be a string or a nanoid.");
    }
    if (!todo.text || typeof todo.text !== "string") {
        throw new Error("validateTodo - Todo object does not contain valid `.text` property.");
    }
    if (todo.text.length > 1000) {
        throw new Error("validateTodo - Todo object `.text` property is larger than 1000 characters.");
    }
    if (typeof todo.completed !== "boolean") {
        throw new Error("validateTodo - Todo object does nto contain valid `.completed` property.");
    }
    // strip any extra data that may have been sent on the object.
    const valid = {
        id: todo.id,
        text: todo.text,
        completed: todo.completed,
    };
    return valid;
}

export default validateTodo;
