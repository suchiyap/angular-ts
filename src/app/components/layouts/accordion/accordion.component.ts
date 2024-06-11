import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full mb-5">
      <div class="mb-2 border border-slate-200 rounded-md">
        <div
          class="p-4 cursor-pointer bg-white hover:bg-slate-100 flex justify-between items-center"
          (click)="togglePanel()"
        >
          <h2 class="text-lg font-medium">{{ title }}</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 transition-transform duration-200 ms-auto"
            [class.rotate-180]="isOpen"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <div *ngIf="isOpen" class="p-4 bg-white border-t border-gray-300">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent {
  @Input() title: string = '';
  isOpen: boolean = true;

  togglePanel() {
    this.isOpen = !this.isOpen;
  }
}
