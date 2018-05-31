export class Monitor {
  id: string;
  environmentId: string;
  path: string;
  method: string = 'GET';
  expectedCode: number = 200;
  expectedText: string;
}
