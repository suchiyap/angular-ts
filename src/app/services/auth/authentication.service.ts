import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { StorageService } from '../common/storage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  // private isLoggedInSubject = new BehaviorSubject<string>('');
  // isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private tokenSubject: BehaviorSubject<string>;
  public isLoggedIn$: Observable<boolean>;

  // updateLoggedInState(token: string) {
  //   this.isLoggedInSubject.next(token);
  // }

  constructor(private localStorage: StorageService) {
    const token = this.localStorage.get('token') || '';
    this.tokenSubject = new BehaviorSubject<string>(token);
    this.isLoggedIn$ = this.tokenSubject.asObservable().pipe(
      map(token => !!token) // Convert token presence to boolean
    );
  }

  public get token(): string {
    return this.tokenSubject.value;
  }

  updateLoggedInState(token: string) {
    this.localStorage.set('token', token);
    this.tokenSubject.next(token);
  }

  logout() {
    this.localStorage.remove('token');
    this.tokenSubject.next('');
  }
}
