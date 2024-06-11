import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/layouts/header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { AuthenticationService } from './services/auth/authentication.service';
import { StorageService } from './services/common/storage.service';
import { SiderComponent } from './components/layouts/sider/sider.component';
import { SiderService } from './services/layouts/sider.service';
import { BreadcrumbsComponent } from './components/layouts/breadcrumbs/breadcrumbs.component';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FooterComponent,
    SiderComponent,
    HeaderComponent,
    BreadcrumbsComponent,
  ],
  template: `<main class="main bg-gray-100">
    <div *ngIf="isLoggedIn; else not_login">
      <app-sider></app-sider>
      <app-header></app-header>
      <main [class.container]="!isOpen" [class.mx-auto]="!isOpen" [class.lg:ms-60]="isOpen">
        <!-- Main content goes here -->
        <div class="relative min-h-screen">
          <div class="pt-24 px-4">
            <app-breadcrumbs [title]="title"/>
            <router-outlet> </router-outlet>
          </div>
        </div>
        <app-footer></app-footer>
      </main>
    </div>
    <ng-template #not_login>
      <div class="relative min-h-screen">
        <router-outlet />
      </div>
    </ng-template>
  </main>`,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  app_title = 'Standard MLM Dev';
  title = 'Home';
  isLoggedIn: boolean | undefined; //initiate param
  isOpen = true;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private localStorage: StorageService,
    private siderService: SiderService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute.firstChild;
        while (route && route.firstChild) {
          route = route.firstChild;
        }
        return route ? route.snapshot : null;
      }),
      map(snapshot => snapshot?.routeConfig?.['title'] as string | undefined)
    ).subscribe((title: string | undefined) => {
      this.title = title || 'Home';
    });

    this.siderService.sidebarOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
    this.isOpen = window.innerWidth > 1024;
  }
}
