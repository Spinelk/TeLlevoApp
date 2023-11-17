import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'campo-texto',
  templateUrl: './campo-texto.component.html',
  styleUrls: ['./campo-texto.component.scss'],
})
export class CampoTextoComponent implements OnInit {

  @Input() placeholder: string = "";
  @Input() tipo: string = "text";
  @Input() valor: string = "";
  @Output() valorChange: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  ngOnInit() { }

}
