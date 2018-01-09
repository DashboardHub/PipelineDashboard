import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface Locale
{
    lang: string;
    data: Object;
}

@Injectable()
export class FuseTranslationLoaderService
{
    constructor(private translate: TranslateService)
    {
    }

    public loadTranslations(...args: Locale[]): void
    {
        const locales = [...args];

        locales.forEach((locale) => {
            // use setTranslation() with the third argument set to true
            // to append translations instead of replacing them
            this.translate.setTranslation(locale.lang, locale.data, true);
        });
    }
}
