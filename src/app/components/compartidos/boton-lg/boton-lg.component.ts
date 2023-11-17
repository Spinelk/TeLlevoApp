import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'boton-lg',
  templateUrl: './boton-lg.component.html',
  styleUrls: ['./boton-lg.component.scss'],
})
export class BotonLgComponent  implements OnInit {

  @Input() texto: string = "";
  @Input() ruta: string = "";

  constructor() { }

  ngOnInit() {}

}
