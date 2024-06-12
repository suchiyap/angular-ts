import { Component, Input } from '@angular/core';
import { CardComponent } from '../../../components/layouts/card/card.component';
import { DynamicFormQuestionComponent, markAllAsTouched } from '../../../components/forms/dynamic-form-question.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminDetails, AdminService } from '../../../services/admin/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptService } from '../../../services/common/crypt.service';
import { QuestionBase } from '../../../components/forms/question-base';
import { TextboxQuestion } from '../../../components/forms/question-text';
import { SwitchQuestion } from '../../../components/forms/question-switch';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-edit',
  standalone: true,
  imports: [CardComponent, DynamicFormQuestionComponent, ReactiveFormsModule],
  templateUrl: './admin-edit.component.html',
  styleUrl: './admin-edit.component.scss'
})
export class AdminEditComponent {
  id: string = '';
  adminDetails = <AdminDetails>{};

  constructor(
    private route: ActivatedRoute,
    private cryptService: CryptService,
    private adminService: AdminService,
    private router:Router,
  ) {}

  loginInfoForm = new FormGroup({
    _method: new FormControl('PUT'),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    password_confirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  @Input() loginInfo: QuestionBase<string>[] | null = [
    new TextboxQuestion({
      key: 'username',
      label: 'Username',
      name: 'username',
      required: true,
      type: 'text',
      order: 1,
    }),
    new TextboxQuestion({
      key: 'password',
      label: 'New Password',
      name: 'password',
      required: true,
      type: 'password',
      order: 1,
    }),
    new TextboxQuestion({
      key: 'password_confirmation',
      label: 'Confirm Password',
      name: 'password_confirmation',
      required: true,
      type: 'password',
      order: 1,
    }),
  ];

  adminform = new FormGroup({
    _method: new FormControl('PUT'),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    status: new FormControl<any>(false, [Validators.required]),
  });

  @Input() questions: QuestionBase<string>[] | null = [
    new TextboxQuestion({
      key: 'name',
      label: 'Name',
      name: 'name',
      required: true,
      type: 'text',
      order: 1,
    }),
    new TextboxQuestion({
      key: 'email',
      label: 'Email',
      name: 'email',
      required: true,
      type: 'email',
      order: 2,
    }),
    new SwitchQuestion({
      key: 'status',
      label: 'Status',
      name: 'status',
      required: true,
      order: 8,
    }),
  ];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = this.cryptService.decrypt(params['id']); // Access the 'id' parameter from the URL

      this.getAdminDetails();
    });
  }

  getAdminDetails() {
    this.adminService.getAdminDetails(this.id).subscribe({
      next: (data) => {
        this.adminDetails = data?.results;

        this.loginInfoForm.setValue({
          _method: 'PUT',
          username: this.adminDetails.username,
          password: '',
          password_confirmation: '',
        });
        this.adminform.setValue({
          _method: 'PUT',
          name: this.adminDetails.name,
          email: this.adminDetails.email,
          status: this.adminDetails.status == 'A' ? true : false,
        });
      },
      error: (error: any) => {
        console.error('Error fetching admin listings', error);
      },
      complete: () => {
        console.log('Admin listing fetch completed');
      },
    });
  }

  onLoginDetailSubmit() {
    if (!this.loginInfoForm.invalid) {
      let data = this.loginInfoForm.value;

      this.adminService.updateAdmin(data, this.id).subscribe({
        next: (data) => {
          Swal.fire({
            text: data?.message,
            icon: 'success',
          });
          this.getAdminDetails();
        },
        complete: () => {
          console.log('Admin login updated successfully');
        },
      });
    }else{
      markAllAsTouched(this.loginInfoForm);
    }
  }

  onAdminDetailSubmit() {
    if (!this.adminform.invalid) {
      let data = this.adminform.value;
      data['status'] = data.status ? 'A' : 'I';

      // console.log(data);return false;
      this.adminService.updateAdmin(data, this.id).subscribe({
        next: (data) => {
          Swal.fire({
            text: data?.message,
            icon: 'success',
          });
          // this.getAdminDetails();
          this.router.navigate(['/admin-listing']);
        },
        complete: () => {
          console.log('Admin detailed updated successfully');
        },
      });
    }else{
      markAllAsTouched(this.adminform);
    }
  }
}
