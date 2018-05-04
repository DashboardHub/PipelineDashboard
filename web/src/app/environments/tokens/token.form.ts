import { ITdDynamicElementConfig, TdDynamicElement } from '@covalent/dynamic-forms';
import { Token } from './token.model';

export class TokenForm {

  constructor(data?: Token) {
    if (data) {
      this.elements.forEach((element, key) => this.elements[key].default = data[element.name]);
    }
  }

  elements: Array<ITdDynamicElementConfig> = [
    {
      name: 'name',
      label: 'Name',
      type: TdDynamicElement.Input,
      required: true,
      minLength: 3,
      maxLength: 32,
      flex:75,
    },
  ]
}
