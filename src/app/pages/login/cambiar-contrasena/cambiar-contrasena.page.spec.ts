import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarContrasenaPage } from './cambiar-contrasena.page';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { AutenticacionService } from 'src/app/services/autenticacion/autenticacion.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CambiarContrasenaPage', () => {
  let component: CambiarContrasenaPage;
  let fixture: ComponentFixture<CambiarContrasenaPage>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [CambiarContrasenaPage],
      imports: [IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireAuthModule, HttpClientTestingModule],
      providers: [AutenticacionService]
    });

    fixture = TestBed.createComponent(CambiarContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
