import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarVehiculoPage } from './registrar-vehiculo.page';
import { HelperService } from 'src/app/services/global/helper.service';
import { IonicModule } from '@ionic/angular';
import { StorageService } from 'src/app/services/global/storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';

describe('RegistrarVehiculoPage', () => {
  let component: RegistrarVehiculoPage;
  let fixture: ComponentFixture<RegistrarVehiculoPage>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarVehiculoPage],
      imports: [IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule, HttpClientTestingModule],
    });

    fixture = TestBed.createComponent(RegistrarVehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
