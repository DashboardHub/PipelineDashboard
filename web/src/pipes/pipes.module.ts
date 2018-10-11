import { NgModule } from '@angular/core';

import { DigitsPipe } from './digits.pipe';
import { ReleaseStatePipe } from './state.pipe';
import { TimeAgoPipe } from './time-ago.pipe';
import { EnvironmentTypePipe } from './type.pipe';
import { UrlencodePipe } from './urlencode.pipe';

@NgModule({
    declarations: [
        DigitsPipe,
        ReleaseStatePipe,
        TimeAgoPipe,
        EnvironmentTypePipe,
        UrlencodePipe
    ],
    exports: [
        DigitsPipe,
        ReleaseStatePipe,
        TimeAgoPipe,
        EnvironmentTypePipe,
        UrlencodePipe
    ]
})
export class PipesModule {
}
