import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrincipalPage } from './principal.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';

describe('PrincipalPage', () => {
  let component: PrincipalPage;
  let fixture: ComponentFixture<PrincipalPage>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [PrincipalPage],
      imports: [IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule, HttpClientTestingModule],
    });

    fixture = TestBed.createComponent(PrincipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
