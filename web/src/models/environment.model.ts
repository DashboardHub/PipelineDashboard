import { Deployed } from './deployed.model';
import { Monitor } from './monitor.model';
import { Pinged } from './pinged.model';
import { Token } from './token.model';

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
