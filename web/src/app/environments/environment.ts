export class Environment {
  id: string;
  title: string;
  description: string;
  link: string;
  isPrivate: boolean;
  tags: Array<string>;
  updatedAt: string;
  createdAt: string;

  constructor(title: string) {
    this.title = title;
  }
}
