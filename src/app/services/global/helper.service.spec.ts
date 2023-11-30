import { TestBed } from '@angular/core/testing';

import { HelperService } from './helper.service';
import { IonicModule, ModalController } from '@ionic/angular';

describe('HelperService', () => {
  let service: HelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      providers: [HelperService, ModalController]
    });
    service = TestBed.inject(HelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
