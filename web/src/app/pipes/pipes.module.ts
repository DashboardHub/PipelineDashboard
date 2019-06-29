import { NgModule } from '@angular/core';

import {
  DigitsPipe,
  EnvironmentTypePipe,
  ReleaseStatePipe,
  StripeSlashPipe,
  TimeAgoPipe,
  TruncatePipe,
  UrlencodePipe,
  UserPipe
} from './index.pipe';

@NgModule({
  declarations: [
    DigitsPipe,
    EnvironmentTypePipe,
    ReleaseStatePipe,
    StripeSlashPipe,
    TimeAgoPipe,
    TruncatePipe,
    UrlencodePipe,
    UserPipe,
  ],
  exports: [
    DigitsPipe,
    EnvironmentTypePipe,
    ReleaseStatePipe,
    StripeSlashPipe,
    TimeAgoPipe,
    TruncatePipe,
    UrlencodePipe,
    UserPipe,
  ],
})
export class PipesModule {
}
