// Third party modules
import { firestore } from 'firebase';

// DashboardHub models
import { IModel, Model } from './model.model';

/**
 * Token interface
 */
export interface IToken extends IModel {
  uid: string;
  name: string;
  createdOn?: firestore.Timestamp;
  updatedOn?: firestore.Timestamp;
}

/**
 * Token model
 */
export class TokenModel extends Model<IToken> implements IToken {
  uid: string;
  name: string;
  createdOn: firestore.Timestamp;
  updatedOn: firestore.Timestamp;

  /**
   * Life cycle method
   * @param token token to initialize
   */
  constructor(token?: IToken) {
    super();
    this.uid = token ? token.uid : undefined;
    this.name = token ? token.name : undefined;
    this.createdOn = token ? token.createdOn : undefined;
    this.updatedOn = token ? token.updatedOn : undefined;
  }

  /**
   * Method to covert model to data
   * @param requiredOnly parameter to check if required token or not
   */
  public toData(requiredOnly?: boolean): IToken {
    const data: IToken = {
      uid: this.uid,
      name: this.name,
    };

    if (!requiredOnly) {
      data.createdOn = this.createdOn;
      data.updatedOn = this.updatedOn;
    }

    return data;
  }
}
