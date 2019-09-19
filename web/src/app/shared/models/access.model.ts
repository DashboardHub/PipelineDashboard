// Applicatoin model
import { IModel, Model } from './model.model';

/**
 * Access interface
 */
export interface IAccess extends IModel {
  admin: string[];
  readonly?: string[];
}

/**
 * Access model
 */
export class AccessModel extends Model<IAccess> implements IAccess {
  admin: string[];
  readonly?: string[];

  /**
   * Life cycle method
   * @param access IAccess instance
   */
  constructor(access?: IAccess) {
    super();
    this.admin = access && access.admin ? access.admin : [];
    this.readonly = access && access.readonly ? access.readonly : [];
  }

  /**
   * The models to data only
   */
  public toData(): IAccess {
    return {
      admin: this.admin,
      readonly: this.readonly,
    };
  }
}
