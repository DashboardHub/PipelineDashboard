export interface IAccess {
  admin: string[];
  readonly?: string[];
}

export class AccessModel implements IAccess {
  admin: string[];
  readonly?: string[];

  constructor(access?: IAccess) {
    this.admin = access && access.admin ? access.admin : [];
    this.readonly = access && access.readonly ? access.readonly : [];
  }
}
