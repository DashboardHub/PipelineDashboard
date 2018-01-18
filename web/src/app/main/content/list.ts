export class List<T> {
  total: number;
  list: Array<T> = [];

  constructor(list: Array<T> = []) {
    list.forEach((item) => this.add(item));
  }

  add(item: T): void {
    this.list.push(item);
  }
}
