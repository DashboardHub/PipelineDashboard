import { NgModule } from '@angular/core';

import {
  DigitsPipe,
  EnvironmentTypePipe,
  NumbersPipe,
  ReleaseStatePipe,
  TimeAgoPipe,
  TruncatePipe,
  UrlencodePipe,
  UserPipe
} from './index.pipe';

@NgModule({
  declarations: [
    DigitsPipe,
    EnvironmentTypePipe,
    NumbersPipe,
    ReleaseStatePipe,
    TimeAgoPipe,
    TruncatePipe,
    UrlencodePipe,
    UserPipe,
  ],
  exports: [
    DigitsPipe,
    EnvironmentTypePipe,
    NumbersPipe,
    ReleaseStatePipe,
    TimeAgoPipe,
    TruncatePipe,
    UrlencodePipe,
    UserPipe,
  ],
})
export class PipesModule {
}
