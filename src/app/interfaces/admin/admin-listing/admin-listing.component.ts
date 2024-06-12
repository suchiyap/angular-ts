import { Component, Input } from '@angular/core';
import { Admin, AdminService } from '../../../services/admin/admin.service';
import { getObjectKeys, getRowIndex } from '../../../common/global-constant';
import { QuestionBase } from '../../../components/forms/question-base';
import { TextboxQuestion } from '../../../components/forms/question-text';
import { CryptService } from '../../../services/common/crypt.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormQuestionComponent } from '../../../components/forms/dynamic-form-question.component';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../components/layouts/table/table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AccordionComponent } from '../../../components/layouts/accordion/accordion.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-listing',
  standalone: true,
  imports: [DynamicFormQuestionComponent, CommonModule, ReactiveFormsModule, TableComponent, NgxPaginationModule, AccordionComponent, RouterLink],
  templateUrl: './admin-listing.component.html',
  styleUrl: './admin-listing.component.scss'
})
export class AdminListingComponent {
  adminLists: Admin[] = [];
  headers = [
    'Actions',
    'No.',
    'Admin Info',
    'Contact Info',
    'Group',
    'Status',
    'Created',
    'Updated'
  ];
  getObjectKeys = getObjectKeys;
  getRowIndex = getRowIndex;

  // for table pagination
  maxSize: number = 10;
  currentPage: number = 1;
  totalItems: number = 0;
  loading: boolean = true;

  // for confirmation dialog
  type: string = 'Alert';
  message: string = "";
  hidden: boolean = true;

  searchForm= new FormGroup({
    username: new FormControl(''),
    name: new FormControl(''),
  });

  @Input() questions: QuestionBase<string>[] | null = [
    new TextboxQuestion({
      key: 'username',
      label: 'Username',
      name: 'username',
      required: true,
      order: 1,
    }),
    new TextboxQuestion({
      key: 'name',
      label: 'Name',
      name: 'name',
      required: true,
      order: 1,
    }),
  ];
  
  constructor(private adminService: AdminService, public cryptService: CryptService) {}

  ngOnInit() {
    this.getAdminListing({limit: this.maxSize});
  }

  getAdminListing (param: {}) {
    this.adminService.getAdminListing(param).subscribe({
      next: (data) => {
        this.loading = false;
        this.adminLists = data?.results?.data.map((admin: { id: any; }) => ({
          ...admin,
          encryptedId: this.cryptService.encrypt((admin.id).toString())
        }));
        console.log(this.adminLists);
        this.totalItems = data?.results?.meta?.total;

      },
      error: (error: any) => {
        console.error('Error fetching admin listings', error);
      },
      complete: () => {
        console.log('Admin listing fetch completed');
      }
    });
  }

  deleteAdmin(id: number) {
    Swal.fire({
      title: 'Are you sure want to remove this admin?',
      text: 'You will not be able to recover',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.adminService.removeAdmin(id).subscribe({
          next: (data) => {
            Swal.fire({
              text: data?.message,
              icon: 'success', 
            });
            this.getAdminListing({page: this.currentPage, limit: this.maxSize});
          },
          error: (error: any) => {
            console.error('Error fetching admin listings', error);
          },
          complete: () => {
            
          }
        })
      } 
    })
  }

  handlePageChange(page: number) {
    this.currentPage = page;
    this.getAdminListing({page: page, limit: this.maxSize});
  }

  onSubmit() {
    let data = this.searchForm.value;

    this.getAdminListing({page: this.currentPage, limit: this.maxSize, ...data});
  }

  onReset() {
    this.searchForm.reset({
      name: '',
      username: ''
    });
    this.getAdminListing({page: this.currentPage, limit: this.maxSize});
  }
}
