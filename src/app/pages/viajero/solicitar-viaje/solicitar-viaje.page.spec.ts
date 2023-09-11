import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitarViajePage } from './solicitar-viaje.page';

describe('SolicitarViajePage', () => {
  let component: SolicitarViajePage;
  let fixture: ComponentFixture<SolicitarViajePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SolicitarViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
