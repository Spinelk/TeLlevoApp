export interface Usuario{
    id:number;
    nombre:string;
    apellido:string;
    correo:string;
    esConductor: boolean;

    urlImagenPerfil?: string;
    rut?:string;
    licencia?:string;

    // Eliminar de todos los lugares donde se usa, firebae se encarga de esto
    contrasena?:string;
}
