import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptService {

  constructor() { }

  key = 'ZNa8QiUKjGA3Kn';

  //To encrypt input data
  encrypt(password: string): string {
    return CryptoJS.AES.encrypt(password, this.key).toString();
  }

  //To decrypt input data
  decrypt(passwordToDecrypt: string) {
    return CryptoJS.AES.decrypt(passwordToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }
}
