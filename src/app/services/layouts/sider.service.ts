import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiderService {
  private sidebarOpen = new BehaviorSubject<boolean>(window.innerWidth > 1024);
  
  sidebarOpen$ = this.sidebarOpen.asObservable();

  toggleSidebar() {
    this.setSidebarOpen(!this.sidebarOpen.value);
  }

  setSidebarOpen(isOpen: boolean) {
    this.sidebarOpen.next(isOpen);
  }
}
