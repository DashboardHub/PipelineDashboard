export class Profile {
  sub: string;
  nickname: string;
  name: string = 'Guest';
  picture: string;
  updatedAt: string;

  constructor(sub: string) {
    this.sub = sub;
  }
}
