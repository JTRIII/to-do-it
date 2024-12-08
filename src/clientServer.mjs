import path from "path";
import { fileURLToPath } from "url";

import express from "express";

import api from "./api/api.mjs";


const PORT = 47900;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATIC_FILES_PATH = path.join(__dirname, 'client');


export function run () {

    const app = express();

    // Security and CORS (Cross Origin Resource Sharing)
    app.use((req_, res, next) => {
        res.set("Access-Control-Allow-Origin", "*");
        res.set('Access-Control-Allow-Headers', 'Content-Type, accept');
        res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    });

    // Redirect root to client
    app.get("/", (req_, res) => {
        res.redirect("/client");
    });

    // Statically serve client files
    app.use("/client", express.static(STATIC_FILES_PATH));

    // Apply API routes
    api.setup(app);

    app.listen(PORT, () => {
        console.log(`Application is listening on http://0.0.0.0:${PORT}`);
    });
}


export default {
    run, 
};
