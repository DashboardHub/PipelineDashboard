export class Pinged {
  id: string;
  environmentId: string;
  monitorId: string;
  url: string;
  statusCode: number;
  expectedCode: boolean;
  expectedText: boolean;
  createdAt: string;

  constructor(url: string) {
    this.url = url;
  }
}
