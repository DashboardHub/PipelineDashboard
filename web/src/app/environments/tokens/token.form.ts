import { ITdDynamicElementConfig, TdDynamicElement } from '@covalent/dynamic-forms';
import { Token } from './token.model';

export class TokenForm {

  elements: ITdDynamicElementConfig[] = [
    {
      name: 'name',
      label: 'Name',
      type: TdDynamicElement.Input,
      required: true,
      minLength: 3,
      maxLength: 32,
    },
  ];

  constructor(data?: Token) {
    if (data) {
      this.elements.forEach((element: ITdDynamicElementConfig, key: number): void => this.elements[key].default = data[element.name]);
    }
  }
}
