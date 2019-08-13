import { Model, IModel } from './model.model';

export interface IAccess extends IModel {
  admin: string[];
  readonly?: string[];
}

export class AccessModel extends Model<IAccess> implements IAccess {
  admin: string[];
  readonly?: string[];

  constructor(access?: IAccess) {
    super();
    this.admin = access && access.admin ? access.admin : [];
    this.readonly = access && access.readonly ? access.readonly : [];
  }

  public toData(): IAccess {
    return {
      admin: this.admin,
      readonly: this.readonly,
    };
  }
}
