import {QuestionBase} from './question-base';
export class MobileNoQuestion extends QuestionBase<string> {
  override controlType = 'mobile';
}