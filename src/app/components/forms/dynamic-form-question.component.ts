import {Component, EventEmitter, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {QuestionBase} from './question-base';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PasswordModule } from 'primeng/password';


@Component({
  standalone: true,
  selector: 'app-question',
  styleUrl: './dynamic-form-question.component.scss',
  templateUrl: './dynamic-form-question.component.html',
  imports: [CommonModule, ReactiveFormsModule, CalendarModule, InputSwitchModule, PasswordModule],
  
})
export class DynamicFormQuestionComponent {
  @Input() question!: QuestionBase<string>;
  @Input() form!: FormGroup;
  @Input() change = new EventEmitter<any>();
  checked: boolean = false;
  value!: string;

  ngOnInit(){
    console.log(this.form);
  }
  onChange(value: any) {
    // console.log('Changed value:', value);
    this.change.emit({ key: this.question.key, value });
  }

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }
}

export function markAllAsTouched(form: FormGroup): void {
  Object.values(form.controls).forEach(control => {
    control.markAsTouched();
    if (control instanceof FormGroup) {
      markAllAsTouched(control);
    }
  });
}