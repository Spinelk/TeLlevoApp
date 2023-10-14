import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarConductorPage } from './registrar-conductor.page';

describe('RegistrarConductorPage', () => {
  let component: RegistrarConductorPage;
  let fixture: ComponentFixture<RegistrarConductorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistrarConductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
