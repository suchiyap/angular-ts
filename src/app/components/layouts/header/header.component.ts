import { Component, HostListener } from '@angular/core';
import { GlobalConstants } from '../../../common/global-constant';
import { SiderService } from '../../../services/layouts/sider.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/auth/login/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isOpen = true;
  // logo_horizontal = GlobalConstants?.storageURL+ 'companies/Meta_Gold-Logo.png';
  logo_horizontal = 'https://www.canterburypilgrimages.com/wp-content/uploads/2021/04/dummy-logo-5b.png';
  // logo = GlobalConstants?.storageURL+ 'companies/logo.png';
  logo = 'https://png.pngtree.com/png-vector/20220913/ourmid/pngtree-i-e-comerce-logo-png-image_6144193.png';

  constructor(private siderService: SiderService, private loginService: LoginService) {}

  ngOnInit() {
    this.siderService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
    this.isOpen = window.innerWidth > 1024;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth <= 1024) {
      this.siderService.setSidebarOpen(false);
    }
  }

  toggleSidebar() {
    this.siderService.toggleSidebar();
  }

  postLogout(){
    this.loginService.logout();
  }
}
