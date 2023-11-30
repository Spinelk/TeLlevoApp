import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmarPage } from './confirmar.page';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';

describe('ConfirmarPage', () => {
  let component: ConfirmarPage;
  let fixture: ComponentFixture<ConfirmarPage>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmarPage],
      imports: [IonicModule.forRoot(), RouterTestingModule,  AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule],
      providers: [ModalController]
    });

    fixture = TestBed.createComponent(ConfirmarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
