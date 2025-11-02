import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  NavigationEnd,
  NavigationExtras,
  Route,
  Router,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { finalize, Observable, Subject, timer } from 'rxjs';
import { User } from '../classes/User';
import { Right } from '../classes/Right.enum';
import { Config } from '../classes/Config';
import { RequestMethod } from '../classes/RequestMethod';
import { ToastType } from '../classes/ToastType';
import { navItems } from '../layouts/full/vertical/sidebar/sidebar-data';
import { HttpClickHandler } from '../directives/HttpClick.directive';

@Injectable({
  providedIn: 'root',
})
export class Util {
  private http = inject(HttpClient);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private dialog = inject(MatDialog);
  private translate = inject(TranslateService);

  routes: Route[] = navItems;
  private serviceUrl: string;
  timezoneOffset = String(new Date().getTimezoneOffset());
  private readonly datePipe = new DatePipe('en-GB');
  pathTitle = new Subject<any[]>();

  constructor() {
    const base = this.decryptText(Config.BACK_END_URL);
    this.serviceUrl = Config.USE_PROXY
      ? `${base}/manager-proxy/`
      : `${base}/api/`;
  }

  createApi(
    url: string,
    data?: any,
    httpClickHandler?: HttpClickHandler,
    method: RequestMethod = RequestMethod.POST
  ): Observable<any> {
    const fullUrl = this.serviceUrl + url;
    const options = this.generateTokenHttpOptions(fullUrl, method);

    const req$ =
      method === RequestMethod.GET
        ? this.http.get(fullUrl, options)
        : this.http.post(fullUrl, data, options);

    return req$.pipe(finalize(() => httpClickHandler?.enable?.()));
  }

  generateTokenHttpOptions(url: string, method?: RequestMethod) {
    let headers = new HttpHeaders();

    if (!method || method === RequestMethod.POST) {
      headers = headers.set('Content-Type', 'application/json');
    }

    if (!url.toLowerCase().includes('login')) {
      const token = this.getFromStorage('token');
      if (token) headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return { headers };
  }

  navigate(path: string, extras?: NavigationExtras): void {
    this.router.navigate([path], extras);
  }

  getRoutes(): Route[] {
    return this.router.config
      .filter((r) => !!r.data)
      .sort((a, b) => (a.data?.['order'] ?? 0) - (b.data?.['order'] ?? 0));
  }

  createToast(
    message: string,
    type: ToastType,
    titleKey?: string,
    onClick?: () => void,
    override?: any
  ): void {
    const title =
      titleKey ??
      this.translate.instant(
        type === ToastType.SUCCESS
          ? 'successTitle'
          : type === ToastType.ERROR
          ? 'error'
          : type === ToastType.WARNING
          ? 'warning'
          : 'info'
      );

    const config = {
      positionClass: this.isMobile()
        ? 'toast-bottom-full-width'
        : this.getDirection() === 'rtl'
        ? 'toast-top-left'
        : 'toast-top-right',
      ...(override ?? {}),
    };

    this.toastr.show(message, title, config, type).onTap.subscribe(() => {
      onClick?.();
    });
  }

  getLabel(key: string): string {
    return this.translate.instant(key);
  }

  getDirection(): 'ltr' | 'rtl' {
    return this.translate.currentLang === 'ar' ? 'rtl' : 'ltr';
  }

  openDialog<T>(component: any, config: MatDialogConfig): MatDialogRef<T> {
    config.direction = this.getDirection();
    return this.dialog.open<T>(component, config);
  }

  getErrorMessage(control: AbstractControl): string {
    if (!control.errors) return '';

    const e = control.errors;
    const msg: string[] = [];

    const add = (k: string, v?: any) =>
      msg.push(this.getLabel(k) + (v ? `: ${v}` : ''));

    if (e['required']) add('fieldRequired');
    if (e['matchPassword']) add('passwordNoMatch');
    if (e['email'] || e['pattern'] || e['mask']) add('invalidFormat');
    if (e['min']) add('lessThanMinimum', e['min'].min);
    if (e['max']) add('moreThanMaximum', e['max'].max);
    if (e['minlength']) add('lessThanMinimum', e['minlength'].requiredLength);
    if (e['maxlength']) add('moreThanMaximum', e['maxlength'].requiredLength);
    if (e['invalidDate']) add('invalidDate');

    return msg.join(' | ') || this.getLabel('error');
  }

  setToStorage(key: string, obj: any, local = true): void {
    const val = typeof obj === 'string' ? obj : JSON.stringify(obj);
    (local ? localStorage : sessionStorage).setItem(key, val);
  }

  getFromStorage<T>(key: string): T | null {
    let val = localStorage.getItem(key) ?? sessionStorage.getItem(key);
    if (!val) return null;
    try {
      return JSON.parse(val);
    } catch {
      return val as any;
    }
  }

  clearStorage(local = true, session = true): void {
    if (local) localStorage.clear();
    if (session) sessionStorage.clear();
  }

  clearItemFromStorage(key: string, local = true, session = true): void {
    if (local) localStorage.removeItem(key);
    if (session) sessionStorage.removeItem(key);
  }

  isStringEmpty(value: string): boolean {
    return !value?.trim();
  }

  copy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  hasRight(right: Right, user: User): boolean {
    return !!user?.privileges?.includes(right);
  }

  doIfHasRight(right: Right, user: User, cb: Function): void {
    if (this.hasRight(right, user)) cb();
  }

  isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile/i.test(
      navigator.userAgent
    );
  }

  private aesKey = 'M7UDO9dF506xIQDJScbMxw==';
  private aesIV = 'RBxzFN4wb0WpoL9A+pH80Q==';

  encryptText(text: string): string {
    return text;
    // const encrypted = CryptoJS.AES.encrypt(
    //   text,
    //   CryptoJS.enc.Base64.parse(this.aesKey),
    //   {
    //     iv: CryptoJS.enc.Base64.parse(this.aesIV),
    //     mode: CryptoJS.mode.CBC,
    //     padding: CryptoJS.pad.Pkcs7,
    //   }
    // );
    // return encrypted.toString();
  }

  decryptText(cipher: string): string {
    return cipher;
    // const decrypted = CryptoJS.AES.decrypt(
    //   cipher,
    //   CryptoJS.enc.Base64.parse(this.aesKey),
    //   {
    //     iv: CryptoJS.enc.Base64.parse(this.aesIV),
    //     mode: CryptoJS.mode.CBC,
    //     padding: CryptoJS.pad.Pkcs7,
    //   }
    // );
    // return decrypted.toString(CryptoJS.enc.Utf8);
  }

  exportAsExcelFile(data: any[], meta: any[], file: string): void {
    // const header = Object.fromEntries(meta.map((m) => [m.dataLabel, m.headerLabel]));
    // const rows = [
    //   header,
    //   ...data.map((d) =>
    //     Object.fromEntries(
    //       meta.map((m) => [
    //         m.dataLabel,
    //         m.formatter
    //           ? m.formatter(this.getDeepValue(d, m.dataLabel))
    //           : this.getDeepValue(d, m.dataLabel),
    //       ])
    //     )
    //   ),
    // ];
    // const ws = XLSX.utils.json_to_sheet(rows, {
    //   skipHeader: true,
    //   header: meta.map((m) => m.dataLabel),
    // });
    // const wb = { Sheets: { Data: ws }, SheetNames: ['Data'] };
    // const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    // const blob = new Blob([buf], {
    //   type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    // });
    // FileSaver.saveAs(blob, `${file}.xlsx`);
  }

  getDeepValue(obj: any, path: string) {
    return path.split('.').reduce((a, c) => (a ? a[c] : null), obj);
  }

  formatDate(date: Date, fmt: string) {
    return this.datePipe.transform(date, fmt);
  }

  trimTime(d: Date) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  addDays(d: Date, n: number) {
    return new Date(d.getTime() + n * 86400000);
  }

  convertDateToUTC(d: Date) {
    return new Date(
      Date.UTC(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds()
      )
    );
  }

  decodeToken(token: string): any {
    return; // jwt_decode(token);
  }

  pageTitle: any[] = [];

  GetUrl(): void {
    this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationEnd &&
        this.router.routerState.root.firstChild
      ) {
        this.pageTitle = [];
        const parts = event.url.split('/');
        this.pageTitle.push({
          value: 'home',
          isClickable: true,
          path: '/',
          isHome: true,
        });

        let total = '';
        parts.forEach((p, i) => {
          if (i === 0 || !p) return;
          total += p + '/';
          const formatted = p
            .split('-')
            .map((x, i2) => (i2 ? x.charAt(0).toUpperCase() + x.slice(1) : x))
            .join('');
          this.pageTitle.push({
            value: formatted,
            isClickable: i !== parts.length - 1,
            path: total,
            isHome: false,
          });
        });
        this.pathTitle.next(this.pageTitle);
      }
    });
  }

  getPagePath() {
    return this.pageTitle;
  }

  applyChangesToPath(p: any[]) {
    this.pageTitle = p;
    this.pathTitle.next(p);
  }
}
