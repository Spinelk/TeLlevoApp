import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitarViajePage } from './solicitar-viaje.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';

describe('SolicitarViajePage', () => {
  let component: SolicitarViajePage;
  let fixture: ComponentFixture<SolicitarViajePage>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [SolicitarViajePage],
      imports: [IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule, HttpClientTestingModule],
    });

    fixture = TestBed.createComponent(SolicitarViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
