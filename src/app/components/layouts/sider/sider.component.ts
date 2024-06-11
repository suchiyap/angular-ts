import { Component, HostListener } from '@angular/core';
import { SiderService } from '../../../services/layouts/sider.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sider',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive, RouterLink, RouterOutlet],
  templateUrl: './sider.component.html',
  styleUrl: './sider.component.scss'
})
export class SiderComponent {
  isOpen = true;
  dropdownStates: { [key: string]: boolean } = {};

  constructor(private siderService: SiderService) {}

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

  toggleDropdown(key: string) {
    this.dropdownStates[key] = !this.dropdownStates[key];
  }

  isDropdownOpen(key: string): boolean {
    return this.dropdownStates[key];
  }
}
