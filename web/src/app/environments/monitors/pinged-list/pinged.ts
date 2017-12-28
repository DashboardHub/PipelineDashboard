export class Pinged {
  id: string;
  environmentId: string;
  monitorId: string;
  url: string;
  statusCode: number;
  codeMatched: boolean;
  textMatched: boolean;
  duration: number;
  createdAt: string;

  constructor(url: string) {
    this.url = url;
  }
}
