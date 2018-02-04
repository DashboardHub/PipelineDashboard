export class Monitor {
  id: string;
  environmentId: string;
  path: string;
  method: string = 'GET';
  expectedCode: string = '200';
  expectedText: string;
  updatedAt: string;

  constructor(path: string) {
    this.path = path;
  }
}
