export interface IModel { }

export abstract class Model<T1> {
  abstract toData(): T1;
}
