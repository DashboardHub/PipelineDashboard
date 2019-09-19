/**
 * Webhook model
 */
export class WebhookModel {
  type: string;
  id: number;
  name: string;
  active: boolean;
  events: string[];
  config: {
    url: string;
    contentType?: 'form' | 'json';
    secret?: string;
    insecureSsl?: '0' | '1';
  };
  updatedAt: Date;
  createdAt: Date;
  url: string;
  testUrl: string;
  pingUrl: string;
  lastResponse: {
    code?: any;
    status: string;
    message?: any;
  };
}
