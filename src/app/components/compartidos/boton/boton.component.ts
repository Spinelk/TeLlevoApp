import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'boton-lg',
  templateUrl: './boton.component.html',
  styleUrls: ['./boton.component.scss'],
})
export class BotonComponent  implements OnInit {

  @Input() texto: string = "";
  @Input() ruta: string = "";

  constructor() { }

  ngOnInit() {}

}
