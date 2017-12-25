export class Monitor {
  id: string;
  environmentId: string;
  uri: string;
  method: string = 'GET';
  cycle: number = 10;
  expectedCode: number = 200;
  expectedText: string;
  updatedAt: string;

  constructor(uri: string) {
    this.uri = uri;
  }
}
