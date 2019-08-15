import { GitHubEventModel } from "../../event.mapper";
import { Repository } from "./repository";

export interface HubEventActions {
  convertToHubEvent(): GitHubEventModel;
  repository: Repository;
}
