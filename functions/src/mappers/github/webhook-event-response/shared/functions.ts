import { DocumentData } from "../../../../client/firebase-admin";
import { HubEventActions } from "./interfaces";

export function isExistProperties(obj: any, keys: string[]){
  if (!obj) {
    return false;
  }

  for (const key of keys) {
    if (!obj.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
}

export function addHubEventToCollection(repository: DocumentData, event: HubEventActions) {
  if (!Array.isArray(repository.events)) {
    repository.events = [];
  }

  repository.events.unshift(event.convertToHubEvent());
}
