import { Deployed } from "./deployed/deployed";
import { Token } from "./token/token";
import {Monitor} from "./monitor/monitor";
import {Pinged} from "./monitor/pinged/pinged";

export class Environment {
  id: string;
  owner: string;
  type: string;
  title: string;
  logo: string;
  description: string;
  link: string;
  releases: number;
  latestRelease: Deployed;
  pings: number;
  latestPing: Pinged;
  progress: {current: number, next: number};
  isPrivate: boolean;
  tags: Array<string>;
  tokens: Array<Token>;
  monitors: Array<Monitor>;
  views: number;
  updatedAt: string;
  createdAt: string;

  constructor(title: string) {
    this.title = title;
  }
}
