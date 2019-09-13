import { firestore } from "firebase-admin";

export interface GitHubRepositoryWebhookResponse {
  type: string;
  id: number;
  name: string;
  active: boolean;
  events: string[];
  config: {
    url: string;
    content_type?: 'form' | 'json';
    secret?: string;
    insecure_ssl?: '0' | '1';
  };
  updated_at: string;
  created_at: string;
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

export interface GitHubRepositoryWebhookModel {
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
  updatedOn: firestore.Timestamp;
  createdOn: firestore.Timestamp;
  url: string;
  testUrl: string;
  pingUrl: string;
  lastResponse: {
    code?: any;
    status: string;
    message?: any;
  };
}

export class GitHubRepositoryWebhookMapper {
  static import(input: GitHubRepositoryWebhookResponse): GitHubRepositoryWebhookModel {
    let config: any = null;
    if (input.config) {
      config = {
        url: input.config.url,
      };

      if(input.config.content_type !== undefined){
        config.contentType = input.config.content_type;
      }
      if(input.config.secret !== undefined){
        config.secret = input.config.secret;
      }
      if(input.config.insecure_ssl !== undefined){
        config.insecureSsl = input.config.insecure_ssl;
      }
    }

    let lastResponse: any = null;
    if (input.last_response) {
      lastResponse = {
      };

      if(input.last_response.code !== undefined){
        lastResponse.code = input.last_response.code;
      }
      if(input.last_response.status !== undefined){
        lastResponse.status = input.last_response.status;
      }
      if(input.last_response.message !== undefined){
        lastResponse.message = input.last_response.message;
      }
    }

    return {
      type: input.type,
      id: input.id,
      name: input.name,
      active: input.active,
      events: input.events,
      config: config,
      updatedOn: firestore.Timestamp.fromDate(new Date(input.updated_at)),
      createdOn: firestore.Timestamp.fromDate(new Date(input.created_at)),
      url: input.url,
      testUrl: input.test_url,
      pingUrl: input.ping_url,
      lastResponse: lastResponse,
    };
  }
}
