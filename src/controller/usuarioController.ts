import { Router } from "https://deno.land/x/oak@v16.1.0/mod.ts";
import { agregar, buscar, actualizar, borrar } from "../service/usuarioService.ts";

const router = new Router();

router.post("/usuario/crear", agregar);
router.get("/usuario/listar/:id", buscar);
router.put("/usuario/actualizar/:id", actualizar);
router.delete("/usuario/delete/:id", borrar);


export default router;