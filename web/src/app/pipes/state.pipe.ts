// Core modules
import { Pipe, PipeTransform } from '@angular/core';

export enum StateData {
  startBuild = 'Build Started',
  finishBuild = 'Build Finished',
  failBuild = 'Build Failed',
  startDeploy = 'Deploy Started',
  finishDeploy = 'Deploy Finished',
  failDeploy = 'Deployed Failed',
}

/**
 * State Pipe
 */
@Pipe({ name: 'releaseState' })
export class ReleaseStatePipe implements PipeTransform {
  transform(state: string): string {
    return StateData[state];
  }
}
