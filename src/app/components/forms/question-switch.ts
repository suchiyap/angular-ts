import {QuestionBase} from './question-base';
export class SwitchQuestion extends QuestionBase<string> {
  override controlType = 'switch';
}