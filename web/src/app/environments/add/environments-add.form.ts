import { ITdDynamicElementConfig, TdDynamicElement, TdDynamicType } from '@covalent/dynamic-forms';

export class EnvironmentsAddForm {
  elements: Array<ITdDynamicElementConfig> = [
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
      minLength: 3,
      maxLength: 1024,
    },
    {
      name: 'logo',
      label: 'Logo (must be https)',
      type: TdDynamicElement.Input,
      required: false,
      minLength: 3,
      maxLength: 1024,
    },
    {
      name: 'isPrivate',
      label: 'Is Private',
      type: TdDynamicType.Boolean,
      default: false,
    },
  ]
}
