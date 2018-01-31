export class Token {
  id: string;
  environmentId: string;
  name: string;
  lastUsed: string;

  constructor(name: string) {
    this.name = name;
  }
}
