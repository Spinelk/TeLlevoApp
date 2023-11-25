import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent  implements OnInit {

  @Input() titulo: string = "";
  @Input() animarTexto: boolean = false;

  constructor(private animationCtrl: AnimationController, private el: ElementRef) { }

  ngAfterViewInit() {
    if (this.animarTexto) {
      const animacionNombre = this.animationCtrl
        .create()
        .addElement(this.el.nativeElement.querySelector('.titulo'))
        .duration(7000)
        .iterations(Infinity)
        .fromTo('transform', 'translateX(350px)', 'translateX(-350px)')
        .fromTo('opacity', '1', '0.2');

      animacionNombre.play();
    }
  }

  ngOnInit() {}

}
