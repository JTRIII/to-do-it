
console.log("Starting application...");

let contentEl = document.querySelector(".page-content");

let html = contentEl.innerHTML;

html+= `
<h1 style="color: green;">Server Started</h1>
`.trimStart();

contentEl.innerHTML = html;

setTimeout(async () => {
    
    
    // let fetchResult = await fetch("http://0.0.0.0:47900/api");
    let fetchResult = await fetch("http://localhost:47900/api/");
    let result = await fetchResult.json();
    console.dir(JSON.stringify(result, null, 4));
    
    let html = contentEl.innerHTML;
    html+= `
    <h1 style="color: red;">${result.data.message}</h1>
    `.trimStart();
    contentEl.innerHTML = html;


    // fetchResult = await fetch("http://0.0.0.0:47900/api/login", {
    fetchResult = await fetch("http://localhost:47900/api/login", {
        method: "POST",
        body: JSON.stringify({
            username: "james",
        }, null, 4),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json",
        },
    });
    result = await fetchResult.json();
    let user = result.data;
    console.dir(JSON.stringify(result, null, 4));


    // add
    // fetchResult = await fetch(`http://0.0.0.0:47900/api/users/${user.id}/todos`, {
    fetchResult = await fetch(`http://localhost:47900/api/users/${user.id}/todos`, {
        method: "POST",
        body: JSON.stringify({
            text: "Feed the cat.",
            completed: false,
        }, null, 4),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json",
        },
    });
    result = await fetchResult.json();
    let todo = result.data;
    console.dir(JSON.stringify(result, null, 4));

    // fetchResult = await fetch(`http://0.0.0.0:47900/api/users/${user.id}/todos`, {
    fetchResult = await fetch(`http://localhost:47900/api/users/${user.id}/todos`, {
        method: "POST",
        body: JSON.stringify({
            text: "Feed the dog.",
            completed: true,
        }, null, 4),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json",
        },
    });
    result = await fetchResult.json();
    todo = result.data;
    console.dir(JSON.stringify(result, null, 4));


    // fetchResult = await fetch(`http://0.0.0.0:47900/api/users/${user.id}/todos`, {
    fetchResult = await fetch(`http://localhost:47900/api/users/${user.id}/todos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json",
        },
    });
    result = await fetchResult.json();
    let todos = result.data;
    console.dir(JSON.stringify(result, null, 4));



}, 1000);

