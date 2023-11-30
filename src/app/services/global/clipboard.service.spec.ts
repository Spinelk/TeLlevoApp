import { TestBed } from '@angular/core/testing';

import { ClipboardService } from './clipboard.service';
import { IonicModule, ModalController } from '@ionic/angular';
import { HelperService } from './helper.service';

describe('ClipboardService', () => {
  let service: ClipboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      providers: [ClipboardService, HelperService, ModalController]
    });
    service = TestBed.inject(ClipboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
