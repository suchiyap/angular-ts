import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptService } from '../../../services/common/crypt.service';
import {
  MemberDetails,
  MemberService,
} from '../../../services/member/member.service';
import { CardComponent } from '../../../components/layouts/card/card.component';
import { QuestionBase } from '../../../components/forms/question-base';
import { TextboxQuestion } from '../../../components/forms/question-text';
import { DynamicFormQuestionComponent, markAllAsTouched } from '../../../components/forms/dynamic-form-question.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DropdownQuestion } from '../../../components/forms/question-dropdown';
import {
  General,
  GeneralDropdown,
  GlobalService,
  Territory,
} from '../../../services/common/global.service';
import { DatePickerQuestion } from '../../../components/forms/question-datepicker';
import { MobileNoQuestion } from '../../../components/forms/question-mobile-no';
import { SwitchQuestion } from '../../../components/forms/question-switch';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [CardComponent, DynamicFormQuestionComponent, ReactiveFormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.scss',
})
export class MemberEditComponent {
  id: string = '';
  memberDetails = <MemberDetails>{};
  genderDropdown: GeneralDropdown[] = [];
  territoryDropdown: GeneralDropdown[] = [];
  prefixDropdown: GeneralDropdown[] = [];
  constructor(
    private route: ActivatedRoute,
    private cryptService: CryptService,
    private memberService: MemberService,
    private globalService: GlobalService
  ) {}

  loginInfoForm = new FormGroup({
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

  memberform = new FormGroup({
    _method: new FormControl('PUT'),
    display_name: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl(''),
    date_of_birth: new FormControl(''),
    country_id: new FormControl('', [Validators.required]),
    mobile_prefix: new FormControl('', [Validators.required]),
    mobile_no: new FormControl('', [Validators.required]),
    referral: new FormControl(''),
    status: new FormControl<any>(false, [Validators.required]),
  });

  @Input() questions: QuestionBase<string>[] | null = [
    new TextboxQuestion({
      key: 'display_name',
      label: 'Display Name',
      name: 'display_name',
      required: true,
      type: 'text',
      order: 1,
    }),
    new TextboxQuestion({
      key: 'name',
      label: 'Name',
      name: 'name',
      required: true,
      type: 'text',
      order: 2,
    }),
    new TextboxQuestion({
      key: 'email',
      label: 'Email',
      name: 'email',
      required: true,
      type: 'email',
      order: 3,
    }),
    new DropdownQuestion({
      key: 'gender',
      label: 'Gender',
      name: 'gender',
      required: true,
      order: 4,
      options: this.genderDropdown,
    }),
    new DatePickerQuestion({
      key: 'date_of_birth',
      label: 'Date of Birth',
      name: 'date_of_birth',
      required: true,
      order: 5,
    }),
    new DropdownQuestion({
      key: 'country_id',
      label: 'Country',
      name: 'country_id',
      required: true,
      order: 6,
      options: this.territoryDropdown,
    }),
    new MobileNoQuestion({
      key: 'mobile',
      label: 'Mobile No',
      name: 'mobile',
      required: true,
      order: 7,
      options: this.territoryDropdown,
    }),
    new TextboxQuestion({
      key: 'referral',
      label: 'Referral',
      name: 'referral',
      required: true,
      order: 7,
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

      this.globalService.getAllGenerals({ type: 'gender' }).subscribe({
        next: (data) => {
          let response: GeneralDropdown[] = [];

          response = data.results.map((general: General, index: number) => {
            return {
              key: general.code, // Customize the key as needed
              value: general.name,
            };
          });

          this.genderDropdown = response;
          // Update the options of the existing DropdownQuestion
          const genderQuestion = this.questions?.find(
            (q) => q.key === 'gender'
          ) as DropdownQuestion;
          if (genderQuestion) {
            genderQuestion.options = this.genderDropdown;
          }
        },
      });

      this.globalService
        .getAllTerritory({ territory_type: 'country' })
        .subscribe({
          next: (data) => {
            let response: GeneralDropdown[] = [];

            response = data.results.map(
              (territory: Territory, index: number) => {
                return {
                  key: territory.id, // Customize the key as needed
                  value: territory.name,
                };
              }
            );

            this.territoryDropdown = response;

            // Update the options of the existing DropdownQuestion
            const countryQuestion = this.questions?.find(
              (q) => q.key === 'country_id'
            ) as DropdownQuestion;
            if (countryQuestion) {
              countryQuestion.options = this.territoryDropdown;
            }

            response = data.results.map(
              (territory: Territory, index: number) => {
                return {
                  key: territory.calling_no_prefix, // Customize the key as needed
                  value: '+' + territory.calling_no_prefix,
                };
              }
            );

            this.prefixDropdown = response;

            // Update the options of the existing DropdownQuestion
            const mobileQuestion = this.questions?.find(
              (q) => q.key === 'mobile'
            ) as DropdownQuestion;
            if (mobileQuestion) {
              mobileQuestion.options = this.prefixDropdown;
            }
          },
        });
      this.getMemberDetails();
    });
  }

  getMemberDetails() {
    this.memberService.getMemberDetails(this.id).subscribe({
      next: (data) => {
        this.memberDetails = data?.results;

        this.loginInfoForm.setValue({
          username: this.memberDetails.username,
          password: '',
          password_confirmation: '',
        });
        this.memberform.setValue({
          _method: 'PUT',
          display_name: this.memberDetails.display_name,
          name: this.memberDetails.name,
          email: this.memberDetails.email,
          gender: this.memberDetails.gender,
          date_of_birth: this.memberDetails.date_of_birth,
          country_id: this.memberDetails.country_id,
          mobile_no: this.memberDetails.mobile_no,
          mobile_prefix: this.memberDetails.mobile_prefix,
          referral: this.memberDetails.referral_name,
          status: this.memberDetails.status == 'A' ? true : false,
        });
      },
      error: (error: any) => {
        console.error('Error fetching member listings', error);
      },
      complete: () => {
        console.log('Member listing fetch completed');
      },
    });
  }

  onLoginDetailSubmit() {
    if (!this.loginInfoForm.invalid) {
      let data = this.loginInfoForm.value;

      this.memberService.updateMember({ ...data }, this.id);
    }else{
      markAllAsTouched(this.loginInfoForm);
    }
  }

  onMemberDetailSubmit() {
    console.log(this.memberform);
    if (!this.memberform.invalid) {
      let data = this.memberform.value;
      data['status'] = data.status ? 'A' : 'I';

      // console.log(data);return false;
      this.memberService.updateMember(data, this.id).subscribe({
        next: (data) => {
          Swal.fire({
            text: data?.message,
            icon: 'success',
          });
          this.getMemberDetails();
        },
        error: (error: any) => {
          Swal.fire({
            text: error,
            icon: 'error',
          });
        },
        complete: () => {
          console.log('Member detailed updated successfully');
        },
      });
    }else{
      markAllAsTouched(this.memberform);
    }
  }
}
