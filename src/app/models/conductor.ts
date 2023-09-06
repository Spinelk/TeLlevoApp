import { Usuario } from "./usuario";

export interface Conductor extends Usuario{
  rut: string,
  licencia: string
}
