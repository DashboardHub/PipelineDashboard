import { Component } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

@Component({
    selector   : 'fuse-sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class FuseSampleComponent
{
    constructor(private translationLoader: FuseTranslationLoaderService)
    {
        this.translationLoader.loadTranslations(english, turkish);
    }
}
