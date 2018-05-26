import { ITdDynamicElementConfig, TdDynamicElement, TdDynamicType } from '@covalent/dynamic-forms';
import { Environment } from './environment.model';
import { AbstractControl } from '@angular/forms';

export class EnvironmentForm {

  elements: ITdDynamicElementConfig[] = [
    {
      name: 'type',
      label: 'Environment Type',
      type: TdDynamicElement.Select,
      required: true,
      selections: [
        { label: 'Build Only', value: 'build' },
        { label: 'Deploy Only', value: 'deploy' },
        { label: 'Build & Deploy', value: 'build-deploy' },
      ],
      default: 'build-deploy',
    },
    {
      name: 'title',
      label: 'Title',
      type: TdDynamicElement.Input,
      required: true,
      minLength: 3,
      maxLength: 32,
    },
    {
      name: 'description',
      label: 'Description',
      type: TdDynamicElement.Input,
      required: false,
      minLength: 3,
      maxLength: 1024,
    },
    {
      name: 'link',
      label: 'Link',
      type: TdDynamicElement.Input,
      required: false,
      validators: [
        {
          validator: (control: AbstractControl) => {
            return control.value && !(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/).test(control.value) ? { invalidUrl: true } : undefined;
          },
        },
      ],
    },
    {
      name: 'logo',
      label: 'Logo (must be https)',
      type: TdDynamicElement.Input,
      required: false,
      minLength: 3,
      maxLength: 1024,
      validators: [
        {
          validator: (control: AbstractControl) => {
            return control.value && control.value.substr(0, 8) !== 'https://' ? { invalidSsl: true } : undefined;
          },
        },
      ],
    },
    // {
    //   name: 'isPrivate',
    //   label: 'Is Private',
    //   type: TdDynamicType.Boolean,
    //   default: false,
    // },
  ];

  constructor(data?: Environment) {
    if (data) {
      this.elements.forEach((element: ITdDynamicElementConfig, key: number) => this.elements[key].default = data[element.name]);
    }
  }
}
