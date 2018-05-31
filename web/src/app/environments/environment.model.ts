import { Monitor } from './monitors/monitor.model';
import { Deployed } from './releases/deployed.model';
import { Pinged } from './monitors/pinged.model';
import { Token } from './tokens/token.model';

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
  pings: { valid: number, invalid: number };
  latestPing: Pinged;
  progress: { current: number, next: number };
  isPrivate: boolean;
  // tags: Array<string> = [];
  tokens: Token[] = [];
  monitors: Monitor[] = [];
  views: number;
  updatedAt: string;
  createdAt: string;
}
