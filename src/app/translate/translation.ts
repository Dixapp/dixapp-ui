import { InjectionToken } from '@angular/core';

// import translations
import { LANG_PL_NAME, LANG_PL_TRANS } from './lang-pl';
import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';
import { LANG_PL_TRANS_ACCESS } from '../access/translations/lang-pl';


// translation token
export const TRANSLATIONS = new InjectionToken<any>('translation');

// all translations
export const dictionary = {
    [LANG_PL_NAME]: {
        ['default']: LANG_PL_TRANS,
        ['access']: LANG_PL_TRANS_ACCESS
    },
    [LANG_EN_NAME]: {
        ['default']: LANG_EN_TRANS
    }
};

// providers
export const TRANSLATION_PROVIDERS = [
    { provide: TRANSLATIONS, useValue: dictionary },
];
