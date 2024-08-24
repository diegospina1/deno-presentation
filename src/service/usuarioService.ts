import { Context } from "https://deno.land/x/oak@v16.1.0/mod.ts";
import "../repository/usuarioRepository.ts";
import {
    actualizarUsuario,
    borrarUsuario,
    buscarUsuarioPorId,
    crearUsuario,
} from "../repository/usuarioRepository.ts";
import { Status } from "jsr:@oak/commons@0.11/status";

//Crear usuario
export async function agregar({ request, response }: Context) {
    const body = await request.body;
    const usuario = await body.json();

    if (usuario.nombre != null && usuario.pais != null) {
        crearUsuario(usuario);
        response.status = Status.Created;
        response.body = {
            message: "Agregando nuevo usuario...",
            userCreated: {
                nombre: usuario.nombre,
                pais: usuario.pais,
            },
        };
    } else {
        response.body = "ALGO SALIO MAL.";
        response.status = Status.BadRequest;
    }
}

//Buscar por id
export async function buscar({ response, params }: any) {
    try {
        const id = parseInt(params.id);
        const usuario = await buscarUsuarioPorId(id);
        if (usuario != null) {
            return response.body = usuario;
        } else {
            response.status = Status.NotFound;
            response.body = {
                message: `Usuario no encontrado para el id: ${id}`,
            };
        }
    } catch (error) {
        console.log(error);
    }
}

//Actualizar usuario
export async function actualizar({ response, request, params }: any) {
    const id = parseInt(params.id);
    const datos = await request.body.json();
    const res = await actualizarUsuario(id, datos.nombre, datos.pais);

    if (res != null) {
        response.status = Status.OK;
        response.body = {
            message: "Usuario actualizado.",
            usuario: {
                id: id,
                nombre: datos.nombre,
                pais: datos.pais,
            },
        };
    } else {
        response.status = Status.NotFound;
        response.body = {
            message: `Usuario no encontrado para el id: ${id}`,
        };
    }
}

//Borrar usuario
export async function borrar({ response, params }: any){
    try{
        const id = parseInt(params.id);
        const res = await borrarUsuario(id);

        if(res != null){
            response.status = Status.NoContent;
        } else {
            response.status = Status.NotFound;
            response.body = {
                message: `Usuario no encontrado para el id: ${id}`
            }
        }
    } catch (error) {
        console.log(error);
    }
}
