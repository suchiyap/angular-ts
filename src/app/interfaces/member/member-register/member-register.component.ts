import { Component, Input } from '@angular/core';
import { CardComponent } from '../../../components/layouts/card/card.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuestionBase } from '../../../components/forms/question-base';
import { TextboxQuestion } from '../../../components/forms/question-text';
import { DynamicFormQuestionComponent } from '../../../components/forms/dynamic-form-question.component';
import { DropdownQuestion } from '../../../components/forms/question-dropdown';

@Component({
  selector: 'app-member-register',
  standalone: true,
  imports: [CardComponent, DynamicFormQuestionComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './member-register.component.html',
  styleUrl: './member-register.component.scss'
})
export class MemberRegisterComponent {
  page_name = 'Member Register';
  registerForm= new FormGroup({
    sponsor_code: new FormControl('', [Validators.required]),
    leg: new FormControl('', [Validators.required]),
  });

  @Input() questions: QuestionBase<string>[] | null = [
    new TextboxQuestion({
      key: 'sponsor_code',
      label: 'Sponsor Code',
      name: 'sponsor_code',
      required: true,
      order: 1,
    }),
    new DropdownQuestion({
      key: 'leg',
      label: 'Leg',
      name: 'leg',
      required: true,
      order: 2,
      options: [{
        key: 'auto',
        value: "Auto",
      },{
        key: 'lft',
        value: "Left",
      },{
        key: 'rgt',
        value: "Right",
      }]
    }),
  ];

  payLoad = '';
  
  onSubmit() {
    this.payLoad = JSON.stringify(this.registerForm.getRawValue());
  }

  handleInputChange(event: any) {
    let value = event.target.value;
    // console.log('Parent component handling input change:', event);
    // Implement your custom logic here
  }
}
