import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="border bg-white rounded-md border-slate-100 shadow-sm mb-5">
        <div *ngIf="title" class="p-5 border-b border-b-slate-100">
          <div class="text-lg font-bold">{{ title }}</div>
        </div>
        <ng-content></ng-content>
    </div>
  `,
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() title: string = '';
}
