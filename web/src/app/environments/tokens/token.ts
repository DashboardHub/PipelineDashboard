export class Token {
  id: string;
  environmentId: string;
  name: string;
  updatedAt: string;

  constructor(name: string) {
    this.name = name;
  }
}
