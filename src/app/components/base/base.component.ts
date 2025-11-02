import { Component, DOCUMENT, inject, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Config } from 'src/app/classes/Config';
import { User } from 'src/app/classes/User';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Util } from 'src/app/services/Util.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
})
export class BaseComponent {
  private translate = inject(TranslateService);
  public util = inject(Util);
  private authorizationService = inject(AuthorizationService);
  private document = inject(DOCUMENT);
  private title = inject(Title);

  public CONFIG = Config;
  public user!: User | null;
  public userLocale: string;
  public direction: 'ltr' | 'rtl';
  public DIRECTION: 'ltr' | 'rtl';

  constructor() {
    this.userLocale = this.translate.currentLang || 'ar';
    this.direction = this.userLocale === 'ar' ? 'rtl' : 'ltr';
    this.DIRECTION = this.direction;

    this.document.documentElement.lang = this.userLocale;
    this.document.documentElement.dir = this.direction;

    this.translate.onLangChange.subscribe((event) => {
      this.userLocale = event.lang;
      this.direction = event.lang === 'ar' ? 'rtl' : 'ltr';
      this.DIRECTION = this.direction;
      this.document.documentElement.lang = event.lang;
      this.document.documentElement.dir = this.direction;

      const websiteName = this.translate.instant('websiteName');
      if (websiteName) {
        this.title.setTitle(websiteName);
      }
    });

    this.authorizationService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  getErrorMessage(formControl: AbstractControl) {
    return this.util.getErrorMessage(formControl);
  }

  dateFromToValidation(fromName: string, toName: string) {
    return (group: FormGroup): { [key: string]: any } | null => {
      const fromCtrl = group.controls[fromName];
      const toCtrl = group.controls[toName];

      if (fromCtrl?.value && toCtrl?.value && fromCtrl.value > toCtrl.value) {
        const error = { invalidDate: true };
        fromCtrl.setErrors(error);
        return error;
      }
      return null;
    };
  }
}
