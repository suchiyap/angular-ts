import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../common/storage.service';
import { AuthenticationService } from '../authentication.service';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../../../common/global-constant';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  code: number;
  error: boolean;
  message: string;
  results: {
    token: string;
    name: string;
    expired_at: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private router: Router,
    private localStorage: StorageService,
    private authService: AuthenticationService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  getAuthToken() {
    return this.localStorage.get('token');
  }

  login(username: string, password: string) {
    this.http
      .post<LoginResponse>(`${GlobalConstants?.apiURL}/login`, {
        username: username,
        password: password,
      })
      .subscribe((config) => {
        this.localStorage.set('token', config?.results?.token);
        this.authService.updateLoggedInState(config?.results?.token);
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate([returnUrl]);
      });
  }

  logout(){
    this.authService.logout();
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigate([returnUrl]);
  }
}
