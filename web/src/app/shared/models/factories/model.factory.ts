import { IModel, Model } from '../model.model';

export class ModelFactory {
  static toModel<T1 extends IModel, T2 extends Model<T1>>(data: T1[], obj: new (a: IModel) => T2): T2[] {
    return data.map((item: T1): T2 => new obj(item));
  }

  static fromModel<T1 extends Model<T2>, T2 extends IModel>(models: T1[]): T2[] {
    return models.map((model: T1): T2 => model.toData());
  }
}
