import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppTranslationService {
  private readonly localeKey = 'locale';
  private readonly directionKey = 'direction';

  public currentLang$ = new BehaviorSubject<string>(
    localStorage.getItem(this.localeKey) || 'ar'
  );
  public direction$ = new BehaviorSubject<'ltr' | 'rtl'>(
    (localStorage.getItem(this.directionKey) as 'ltr' | 'rtl') || 'rtl'
  );

  constructor(private translate: TranslateService) {
    const savedLang = this.currentLang$.value;
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang(savedLang);
    this.translate.use(savedLang);
  }

  setLocale(lang: 'en' | 'ar'): void {
    this.translate.use(lang);
    this.currentLang$.next(lang);
    localStorage.setItem(this.localeKey, lang);

    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    this.direction$.next(dir);
    localStorage.setItem(this.directionKey, dir);
  }

  getLocale(): string {
    return this.translate.currentLang;
  }

  getDirection(): 'ltr' | 'rtl' {
    return this.direction$.value;
  }

  instant(key: string, params?: any): string {
    return this.translate.instant(key, params);
  }
}
