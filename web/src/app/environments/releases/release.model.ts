import { Token } from '../tokens/token.model';
import { Deployed } from './deployed.model';

export class Release {
  version: string;
  token: Token;
  failDeploy: string;
  finishDeploy: string;
  startDeploy: string;
  failBuild: string;
  finishBuild: string;
  startBuild: string;
  latest: Deployed;
}
