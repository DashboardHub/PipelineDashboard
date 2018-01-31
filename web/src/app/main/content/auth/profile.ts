export class Profile {
  sub: string;
  nickname: string;
  name: string;
  picture: string;
  updatedAt: string;

  constructor(sub: string) {
    this.sub = sub;
  }
}
