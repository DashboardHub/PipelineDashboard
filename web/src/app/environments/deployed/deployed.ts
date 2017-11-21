import { Token } from "../tokens/token";

export class Deployed {
  id: string;
  environmentId: string;
  release: string;
  state: string;
  token: Token;
  createdAt: string;
}
