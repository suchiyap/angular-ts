import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Member, MemberService } from '../../../services/member/member.service';
import { getObjectKeys, getRowIndex } from '../../../common/global-constant';
import { TableComponent } from '../../../components/layouts/table/table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AccordionComponent } from '../../../components/layouts/accordion/accordion.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionBase } from '../../../components/forms/question-base';
import { TextboxQuestion } from '../../../components/forms/question-text';
import { DynamicFormQuestionComponent } from '../../../components/forms/dynamic-form-question.component';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { CryptService } from '../../../services/common/crypt.service';

@Component({
  selector: 'app-member-listing',
  standalone: true,
  imports: [DynamicFormQuestionComponent, CommonModule, ReactiveFormsModule, TableComponent, NgxPaginationModule, AccordionComponent, RouterLink],
  templateUrl: './member-listing.component.html',
  styleUrls: ['./member-listing.component.scss']
})
export class MemberListingComponent implements OnInit {
  memberLists: Member[] = [];
  headers = [
    'Actions',
    'No.',
    'Country',
    'Member Info',
    'Contact Info',
    'Referral',
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
    email: new FormControl(''),
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
    new TextboxQuestion({
      key: 'email',
      label: 'Email',
      name: 'email',
      required: true,
      order: 1,
    }),
  ];
  
  constructor(private memberService: MemberService, public cryptService: CryptService) {}

  ngOnInit() {
    this.getMemberListing({limit: this.maxSize});
  }

  getMemberListing (param: {}) {
    this.memberService.getMemberListing(param).subscribe({
      next: (data) => {
        this.loading = false;
        this.memberLists = data?.results?.data.map((member: { id: any; }) => ({
          ...member,
          encryptedId: this.cryptService.encrypt((member.id).toString())
        }));
        console.log(this.memberLists);
        this.totalItems = data?.results?.meta?.total;

      },
      error: (error: any) => {
        console.error('Error fetching member listings', error);
      },
      complete: () => {
        console.log('Member listing fetch completed');
      }
    });
  }

  deleteMember(id: number) {
    Swal.fire({
      title: 'Are you sure want to remove this member?',
      text: 'You will not be able to recover',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.memberService.removeMember(id).subscribe({
          next: (data) => {
            Swal.fire({
              text: data?.message,
              icon: 'success', 
            });
            this.getMemberListing({page: this.currentPage, limit: this.maxSize});
          },
          error: (error: any) => {
            console.error('Error fetching member listings', error);
          },
          complete: () => {
            
          }
        })
      } 
    })
  }

  handlePageChange(page: number) {
    this.currentPage = page;
    this.getMemberListing({page: page, limit: this.maxSize});
  }

  onSubmit() {
    let data = this.searchForm.value;

    this.getMemberListing({page: this.currentPage, limit: this.maxSize, ...data});
  }

  onReset() {
    this.searchForm.reset({
      name: '',
      email: '',
      username: ''
    });
    this.getMemberListing({page: this.currentPage, limit: this.maxSize});
  }
}
