export interface Usuario{
    id:number;
    nombre:string;
    apellido:string;
    correo:string;
    contrasena:string;
    rut?:string;
    licencia?:string;
    esConductor: boolean;
}
