import { TestBed } from '@angular/core/testing';

import { AutenticacionService } from './autenticacion.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AutenticacionService', () => {
  let service: AutenticacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule, HttpClientTestingModule
      ],
      providers: [AutenticacionService]
    });

    service = TestBed.inject(AutenticacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
