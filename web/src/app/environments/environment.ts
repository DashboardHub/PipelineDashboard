export class Environment {
  id: string;
  name: string;
  description: string;
  url: string;
  isPrivate: boolean;
  tags: Array<string>;
  updatedAt: string;
  createdAt: string;

  constructor(name: string) {
    this.name = name;
  }
}
