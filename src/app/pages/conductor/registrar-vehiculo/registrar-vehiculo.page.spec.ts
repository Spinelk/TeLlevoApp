import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarVehiculoPage } from './registrar-vehiculo.page';

describe('RegistrarVehiculoPage', () => {
  let component: RegistrarVehiculoPage;
  let fixture: ComponentFixture<RegistrarVehiculoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistrarVehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
