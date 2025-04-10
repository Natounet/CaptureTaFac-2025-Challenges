import { Database } from "bun:sqlite";
const BASE_PATH = "./dist";
const DB_PATH = "./db/db.sqlite";

if (!Bun.file(DB_PATH)) {
    throw new Error("Database not found at " + DB_PATH);
}

const db = new Database(DB_PATH, {readonly: true});



Bun.serve({
    port: 3051,
    routes: {
        "/api/login": {
            POST: async req => {

                if (req.headers.get("User-Agent")?.includes("sqlmap")) {
                    return new Response(JSON.stringify({ error: "Vous n'êtes pas autorisé à accéder à cette page." }));
                }

                const body = await req.json() as { username: string; password: string };
                const { username, password } = body;

                if (!username || !password) {
                    return new Response(JSON.stringify({ error: "Vous devez entrer un username et un password." }));
                }
                try {
                const query = await db.query("SELECT * FROM users WHERE (username = '" + username + "') AND (password = '" + password + "') LIMIT 1;");
                const user = query.all();
                if (user == undefined || user.length == 0) {
                    return new Response(JSON.stringify({ error: "Identifiants incorrectes." }));
                }

                else {
                    return new Response(JSON.stringify({ success: "Vous êtes connecté en tant que : " + username }));
                }
            } catch (e) {
                return new Response(JSON.stringify({ error: (e as Error).toString() }));
            }
            }
        },

        "/:page": async (req) => {
            const filePath = BASE_PATH + "/" + req.params.page;
            if (!await Bun.file(filePath).exists()) {
                return new Response("Page not found", { status: 404 });
            }
            const file = Bun.file(filePath);
            return new Response(file);
        },

        "/": (req) => {
            const file = Bun.file(BASE_PATH + "/index.html");
            return new Response(file);
        }
    }
});

console.log("Server is running on port 3051");
console.log("http://localhost:3051/");
