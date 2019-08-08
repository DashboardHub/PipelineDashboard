import { User } from './user';

export interface Milestone {
  url: string;
  html_url: string;
  labels_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  description: string;
  creator: User;
  open_issues: number;
  closed_issues: number;
  state: string;
  created_at: Date;
  updated_at: Date;
  due_on: Date;
  closed_at?: Date;
}
