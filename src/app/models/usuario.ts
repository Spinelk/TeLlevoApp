export interface Usuario{
    id:number;
    nombre:string;
    apellido:string;
    correo:string;
    contrasena:string;
    esConductor: boolean;

    rut?:string;
    licencia?:string;
}
