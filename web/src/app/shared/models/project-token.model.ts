export class ProjectTokenModel {
  uid: string;
  name: string;

  constructor(uid?: string, name?: string) {
    this.uid = uid;
    this.name = name;
  }
}
