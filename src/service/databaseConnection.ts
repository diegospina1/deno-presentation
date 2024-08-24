import { Client } from "https://deno.land/x/mysql@v2.12.1/mod.ts";

const client = await new Client().connect({
    hostname: 'localhost',
    username: 'root',
    db: 'example_deno',
    password: ''
});

export default client;