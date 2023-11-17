import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent implements OnInit {

  @Input() texto: string = "";
  @Input() icono: string = "";
  @Input() activado: boolean = false;
  colorIcono: string = "medium";
  colorTexto: string = "text-gray-500";

  constructor() { }

  ngOnInit() {
    if (this.activado == true) {
      this.colorIcono = "danger";
      this.colorTexto = "";
    }
  }
}
