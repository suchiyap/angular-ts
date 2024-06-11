import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  template: `
    <div class="overflow-auto">
      <table class="border-collapse table-auto w-full text-sm rounded-md mb-3">
        <thead class="border bg-slate-100">
          <tr>
            <ng-container *ngFor="let header of headers; index as i">
              <th [class.text-center]="i == 0">{{ header }}</th>
            </ng-container>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-slate-800">
          <ng-content></ng-content>
        </tbody>
      </table>
    </div>

    <div class="spinner flex justify-center items-center" [ngClass]="{ hidden: !loading }">
      <svg
        aria-hidden="true"
        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="ms-3">Loading...</span>
    </div>
    <pagination-controls
      class="text-end table-pagination"
      [maxSize]="maxSize"
      [autoHide]="autoHide"
      [responsive]="responsive"
      previousLabel="Previous"
      nextLabel="Next"
      screenReaderPaginationLabel="Pagination"
      screenReaderPageLabel="page"
      screenReaderCurrentLabel="You're on page"
      (pageChange)="onPageChange($event)"
      (pageBoundsCorrection)="onPageBoundsCorrection($event)"
    ></pagination-controls>
  `,
  styleUrl: './table.component.scss',
})
export class TableComponent {
  autoHide: boolean = true;
  responsive: boolean = true;
  @Input() headers: string[] = [];
  @Input() maxSize: number = 50;
  @Input() p: number = 1;
  @Input() loading: boolean = true;
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageBoundsCorrection = new EventEmitter<number>();

  onPageChange(event: number) {
    this.p = event;
    this.pageChange.emit(this.p);
  }

  onPageBoundsCorrection(event: number) {
    this.p = event;
    this.pageBoundsCorrection.emit(this.p);
  }
}
