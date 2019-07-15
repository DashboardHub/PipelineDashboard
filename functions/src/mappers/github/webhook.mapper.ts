export interface GitHubRepositoryWebhookResponse {
  type: string;
  id: number;
  name: string;
  active: boolean;
  events: string[];
  config: {
    content_type: string;
    insecure_ssl: string;
    url: string;
  };
  updated_at: Date;
  created_at: Date;
  url: string;
  test_url: string;
  ping_url: string;
  last_response: {
    code?: any;
    status: string;
    message?: any;
  };
}

export interface GitHubRepositoryWebhookRequestCreate {
  name: string;
  active?: boolean;
  events?: string[];
  config: {
    url: string;
    content_type?: 'form' | 'json';
    secret?: string;
    insecure_ssl?: '0' | '1';

  }
}
