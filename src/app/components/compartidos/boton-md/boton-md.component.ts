import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'boton-md',
  templateUrl: './boton-md.component.html',
  styleUrls: ['./boton-md.component.scss'],
})
export class BotonMdComponent  implements OnInit {

  @Input() texto: string = "";
  @Input() ruta: string = "";

  constructor() { }

  ngOnInit() {}

}
