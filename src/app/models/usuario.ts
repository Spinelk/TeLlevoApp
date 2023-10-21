export interface Usuario{
    id:number;
    nombre:string;
    apellido:string;
    correo:string;
    esConductor: boolean;

    urlImagenPerfil?: string;
    rut?:string;
    licencia?:string;
}