import { Clipboard } from '@capacitor/clipboard';
import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {
  constructor(
    private helper: HelperService,
  ) { }


  async copiarPortapapeles(text: string) {
    try {
      await Clipboard.write({ string: text });
      this.helper.showToast('Copiado al portapapeles');
      text = '';
    } catch (error) {
      console.error('Error writing to clipboard:', error);
      throw error;
    }
  }

  async checkClipboard() {
    try {
      const { type, value } = await Clipboard.read();
      return { type, value };
    } catch (error) {
      console.error('Error reading clipboard:', error);
      throw error;
    }
  }
}
