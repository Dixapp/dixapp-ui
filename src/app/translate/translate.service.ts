import {Injectable, Inject} from '@angular/core';
import { TRANSLATIONS } from './translation'; 

@Injectable()
export class TranslateService {
    private _currentLang: string;

    public get currentLang() {
        return this._currentLang;
    }

    // inject our translations
    constructor(@Inject(TRANSLATIONS) private _translations: any) {
    }

    public use(lang: string): void {
        // set current language
        if(!this._translations[lang]){
            this._currentLang = 'en';
        } else {
            this._currentLang = lang;
        }
    }

    private translate(key: string): string {
        // private perform translation
        let translation = key;
        let data = key.split('/');

        if (this._translations[this.currentLang]) {
            if(data.length === 1 && this._translations[this.currentLang]['default'][key]){
                return this._translations[this.currentLang]['default'][key];
            } else if(data.length > 1 && this._translations[this.currentLang][data[0]] && this._translations[this.currentLang][data[0]][data[1]]){
                return this._translations[this.currentLang][data[0]][data[1]]
            }
        }
        return translation;
    }

    public instant(key: string) {
        // call translation
        return this.translate(key); 
    }
}