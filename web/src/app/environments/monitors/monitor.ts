export class Monitor {
  id: string;
  environmentId: string;
  path: string;
  method: string = 'GET';
  cycle: string = '30';
  expectedCode: string = '200';
  expectedText: string;
  updatedAt: string;

  constructor(path: string) {
    this.path = path;
  }
}
