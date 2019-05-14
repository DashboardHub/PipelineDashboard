import { NgModule } from '@angular/core';

import { DigitsPipe } from './index.pipe';
import { EnvironmentTypePipe } from './index.pipe';
import { ReleaseStatePipe } from './index.pipe';
import { TimeAgoPipe } from './index.pipe';
import { TruncatePipe } from './index.pipe';
import { UrlencodePipe } from './index.pipe';
import { UserPipe } from './index.pipe';

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
