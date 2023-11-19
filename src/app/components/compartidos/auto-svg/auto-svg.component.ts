import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'auto-svg',
  templateUrl: './auto-svg.component.html',
  styleUrls: ['./auto-svg.component.scss'],
})
export class AutoSvgComponent implements OnInit {

  @Input() color: string = '';
  hex: string = '';

  constructor() {
  }

  ngOnInit() {
    const colores = {
      "Blanco": "#ffffff",
      "Negro": "#000000",
      "Gris": "#707070",
      "Plata": "#aaa7a7",
      "Azul": "#0e33c8",
      "Rojo": "#c80e2a",
      "Verde": "#1a611e",
      "Amarillo": "#e4e802",
      "Dorado": "#bea609",
      "Naranja": "#f06c00",
      "Morado": "#7800f0",
      "Rosado": "#dc3be8",
    }

    switch (this.color) {
      case "Blanco": {
        this.hex = colores.Blanco
        break;
      }
      case "Negro": {
        this.hex = colores.Negro;
        break;
      }
      case "Gris": {
        this.hex = colores.Gris;
        break;
      }
      case "Plata": {
        this.hex = colores.Plata;
        break;
      }
      case "Azul": {
        this.hex = colores.Azul;
        break;
      }
      case "Rojo": {
        this.hex = colores.Rojo;
        break;
      }
      case "Verde": {
        this.hex = colores.Verde;
        break;
      }
      case "Amarillo": {
        this.hex = colores.Amarillo;
        break;
      }
      case "Dorado": {
        this.hex = colores.Dorado;
        break;
      }
      case "Naranja": {
        this.hex = colores.Naranja;
        break;
      }
      case "Morado": {
        this.hex = colores.Morado;
        break;
      }
      case "Rosado": {
        this.hex = colores.Rosado;
        break;
      }
    }
  }
}
