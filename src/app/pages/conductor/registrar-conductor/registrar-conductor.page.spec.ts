import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarConductorPage } from './registrar-conductor.page';
import { IonicModule } from '@ionic/angular';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('RegistrarConductorPage', () => {
  let component: RegistrarConductorPage;
  let fixture: ComponentFixture<RegistrarConductorPage>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarConductorPage],
      imports: [IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireAuthModule,],
    });

    fixture = TestBed.createComponent(RegistrarConductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
