import { NgModule } from '@angular/core';

import { DigitsPipe } from './digits.pipe';
import { EnvironmentTypePipe } from './type.pipe';
import { ReleaseStatePipe } from './state.pipe';
import { TimeAgoPipe } from './time-ago.pipe';
import { TruncatePipe } from './truncate.pipe';
import { UrlencodePipe } from './urlencode.pipe';
import { UserPipe } from './user.pipe';

@NgModule({
    declarations: [
        DigitsPipe,
        EnvironmentTypePipe,
        ReleaseStatePipe,
        TimeAgoPipe,
        TruncatePipe,
        UrlencodePipe,
        UserPipe,
    ],
    exports: [
        DigitsPipe,
        EnvironmentTypePipe,
        ReleaseStatePipe,
        TimeAgoPipe,
        TruncatePipe,
        UrlencodePipe,
        UserPipe,
    ]
})
export class PipesModule {
}
