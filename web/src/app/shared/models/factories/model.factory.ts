// Application model
import { IModel, Model } from '../model.model';

/**
 * Manage to and from data / models
 */
export class ModelFactory {
  static toModels<T1 extends IModel, T2 extends Model<T1>>(data: T1[], obj: new (a: IModel) => T2): T2[] {
    return data.map((item: T1): T2 => new obj(item));
  }

  /**
   * Method to convert models to interface
   * @param models Model
   */
  static fromModels<T1 extends Model<T2>, T2 extends IModel>(models: T1[]): T2[] {
    return models.map((model: T1): T2 => model.toData());
  }
}
