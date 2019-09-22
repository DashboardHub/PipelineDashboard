import { IRepository } from './repository.model';

export class ActivityModel {
  type: string;
  payload: { title: string, action?: string };
  repository: IRepository;
  createdOn: Date;
}
