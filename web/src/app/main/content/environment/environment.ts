// import { Deployed } from "./deployed/deployed";
// import { Token } from "./tokens/token";
// import { Monitor } from "./monitors/monitor";

export class Environment {
  id: string;
  owner: string;
  type: string;
  title: string;
  logo: string;
  description: string;
  link: string;
  // latestRelease: Deployed;
  releases: number;
  progress: number;
  isPrivate: boolean;
  tags: Array<string>;
  // tokens: Array<Token>;
  // monitors: Array<Monitor>;
  updatedAt: string;
  createdAt: string;

  constructor(title: string) {
    this.title = title;
  }
}
