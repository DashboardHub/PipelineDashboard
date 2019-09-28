/**
 * Model interface
 */
export interface IModel { }

/**
 * Model model
 */
export abstract class Model<T1> {
  abstract toData(): T1;
}
