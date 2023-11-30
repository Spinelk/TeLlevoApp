import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroUsuarioPage } from './registro-usuario.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';

describe('RegistroUsuarioPage', () => {
  let component: RegistroUsuarioPage;
  let fixture: ComponentFixture<RegistroUsuarioPage>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [RegistroUsuarioPage],
      imports: [IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule, HttpClientTestingModule],
    });

    fixture = TestBed.createComponent(RegistroUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
