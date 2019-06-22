export interface IProjectTokenModel {
  uid: string;
  name: string;
}

export class ProjectTokenModel {
  uid: string;
  name: string;

  constructor(obj?: IProjectTokenModel) {
    this.uid = obj ? obj.uid : undefined;
    this.name = obj ? obj.name : undefined;
  }
}
