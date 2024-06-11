import {QuestionBase} from './question-base';
export class DatePickerQuestion extends QuestionBase<string> {
  override controlType = 'datepicker';
}