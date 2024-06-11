import { Component, inject } from '@angular/core';
import { LoginService } from '../../../services/auth/login/login.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GlobalConstants } from '../../../common/global-constant';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginService: LoginService = inject(LoginService);

  login = { username: '', password: '' };

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  // logo = GlobalConstants?.storageURL + 'companies/logo.png';
  logo = 'https://png.pngtree.com/png-vector/20220913/ourmid/pngtree-i-e-comerce-logo-png-image_6144193.png';

  postLogin() {
    if (!this.loginForm.invalid) {
      this.loginService.login(
        this.loginForm.value.username ?? '',
        this.loginForm.value.password ?? '',
      );
    }
  }
}
