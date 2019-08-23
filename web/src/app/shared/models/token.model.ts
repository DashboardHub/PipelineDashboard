// Third party modules
import { firestore } from 'firebase';

// DashboardHub models
import { IModel, Model } from './model.model';

export interface IToken extends IModel {
  uid: string;
  name: string;
  createdOn?: firestore.Timestamp;
  updatedOn?: firestore.Timestamp;
}

export class TokenModel extends Model<IToken> implements IToken {
  uid: string;
  name: string;
  createdOn: firestore.Timestamp;
  updatedOn: firestore.Timestamp;

  constructor(token?: IToken) {
    super();
    this.uid = token ? token.uid : undefined;
    this.name = token ? token.name : undefined;
    this.createdOn = token ? token.createdOn : undefined;
    this.updatedOn = token ? token.updatedOn : undefined;
  }

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
