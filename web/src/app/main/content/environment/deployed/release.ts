import { Token } from "../token/token";

export class Release {
  latest: string;
  version: string;
  token: Token;
  startBuild: string;
  finishBuild: string;
  startDeploy: string;
  finishDeploy: string;
}
