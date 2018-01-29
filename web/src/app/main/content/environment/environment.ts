import { Deployed } from "./deployed/deployed";
import { Token } from "./token/token";
import {Monitor} from "./monitor/monitor";

export class Environment {
  id: string;
  owner: string;
  type: string;
  title: string;
  logo: string;
  description: string;
  link: string;
  latestRelease: Deployed;
  releases: number;
  progress: {current: number, next: number};
  isPrivate: boolean;
  tags: Array<string>;
  tokens: Array<Token>;
  monitors: Array<Monitor>;
  updatedAt: string;
  createdAt: string;

  constructor(title: string) {
    this.title = title;
  }
}
