import { Deployed } from "./deployed/deployed";

export class Environment {
  id: string;
  owner: string;
  title: string;
  description: string;
  link: string;
  latestRelease: Deployed;
  releases: number;
  progress: number;
  isPrivate: boolean;
  tags: Array<string>;
  updatedAt: string;
  createdAt: string;

  constructor(title: string) {
    this.title = title;
  }
}
