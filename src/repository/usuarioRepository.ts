import client from "../service/databaseConnection.ts";

interface usuario{
    nombre: String;
    pais: String;
}

//Listar todos los usuarios en la BD
export async function listarUsuarios(){
    return await client.execute("SELECT * FROM usuarios");
}

//Buscar usuario por Id
export async function buscarUsuarioPorId(id: number){
    const res = await client.execute(
        "SELECT * FROM usuarios WHERE id = ?", [id]
    );

    if (res.rows != null) {
        return res.rows[0];
    } else {
        return null;
    }
}

//Añadir un usuario
export async function crearUsuario({ nombre, pais }: usuario){
    const res = await client.execute(
        "INSERT INTO usuarios(nombre, pais) VALUES (?,?)",
        [nombre, pais]
    );

    return res;
}

//Actualizar un usuario
export async function actualizarUsuario(id: number, nombre: String, pais: String){
    const usuario = await buscarUsuarioPorId(id);
    if(nombre == null){
        nombre = usuario.nombre;
    } 
    if(pais == null){
        pais = usuario.pais;
    }

    if(usuario != null){
        const res = await client.execute(
            "UPDATE usuarios SET nombre = ?, pais = ? WHERE id = ?",
            [nombre, pais, usuario.id]
        );
        return res;
    } else {
        return null;
    } 
}

//Borrar usuario
export async function borrarUsuario(id: number){
    const usuario = await buscarUsuarioPorId(id);
    if(usuario != null){
        const res = await client.execute(
            "DELETE FROM usuarios WHERE id = ?",
            [usuario.id]
        );
    } else {
        return null;
    } 
}