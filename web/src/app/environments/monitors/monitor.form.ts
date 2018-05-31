import { ITdDynamicElementConfig, TdDynamicElement } from '@covalent/dynamic-forms';

export class MonitorForm {

  elements: ITdDynamicElementConfig[] = [
    {
      name: 'method',
      label: 'Method',
      type: TdDynamicElement.Select,
      required: true,
      selections: [
        { label: 'GET', value: 'GET' },
      ],
      default: 'GET',
    },
    {
      name: 'path',
      label: 'Path (this is appended to your enviroment URL)',
      type: TdDynamicElement.Input,
      required: true,
      minLength: 0,
      maxLength: 512,
      default: '/',
    },
    {
      name: 'expectedCode',
      label: 'Expected Code',
      type: TdDynamicElement.Select,
      required: true,
      selections: [
        { label: '200', value: 200 },
        { label: '201', value: 201 },
        { label: '204', value: 204 },
        { label: '400', value: 400 },
        { label: '404', value: 404 },
      ],
      default: 200,
    },
    {
      name: 'expectedText',
      label: 'Expexted Text',
      type: TdDynamicElement.Input,
      required: false,
      minLength: 0,
      maxLength: 1024,
    },
  ];
}
