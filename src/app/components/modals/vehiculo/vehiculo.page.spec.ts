import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiculoPage } from './vehiculo.page';
import { IonicModule, ModalController } from '@ionic/angular';
import { HelperService } from 'src/app/services/global/helper.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

describe('VehiculoPage', () => {
  let component: VehiculoPage;
  let fixture: ComponentFixture<VehiculoPage>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ VehiculoPage ],
      imports: [IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule],
      providers: [HelperService, ModalController],
    });

    fixture = TestBed.createComponent(VehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
