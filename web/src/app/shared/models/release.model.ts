import { UserModel } from './user.model';

export class ReleaseModel {
    uid: string;
    title: string;
    description: string;
    owner: UserModel;
    createdOn: Date;
}
