import {Application} from "https://deno.land/x/oak@v16.1.0/mod.ts";
import router from "./controller/usuarioController.ts";

const app = new Application();

app.use(router.routes());

await app.listen({port: 3000});