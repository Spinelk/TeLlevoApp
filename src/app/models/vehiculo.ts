import { Conductor } from "./conductor";

export interface Vehiculo{
  patente: string,
  tipoVehiculo: string,
  marca: string,
  modelo: string,
  color: string,
  cantidadAsientos: number,
  conductor: Conductor
}
