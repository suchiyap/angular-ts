import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
     <div class="flex text-center justify-center py-3 text-xs italic"> &copy; {{ currentYear }}. All Right Reserved.</div>
  `,
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}

