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