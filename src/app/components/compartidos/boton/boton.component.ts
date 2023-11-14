import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'boton',
  templateUrl: './boton.component.html',
  styleUrls: ['./boton.component.scss'],
})
export class BotonComponent  implements OnInit {

  @Input() texto: string = "";
  @Input() ruta: string = "";

  constructor() { }

  ngOnInit() {}

}
