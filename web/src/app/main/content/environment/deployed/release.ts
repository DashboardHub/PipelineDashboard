import { Token } from "../token/token";

export class Release {
  latest: string;
  version: string;
  token: Token;
  startBuild: string;
  finishBuild: string;
  failBuild: string;
  startDeploy: string;
  finishDeploy: string;
  failDeploy: string;
  duration: number;
}
