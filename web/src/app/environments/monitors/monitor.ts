export class Monitor {
  id: string;
  environmentId: string;
  path: string;
  method: string = 'GET';
  cycle: number = 10;
  expectedCode: number = 200;
  expectedText: string;
  updatedAt: string;

  constructor(path: string) {
    this.path = path;
  }
}
