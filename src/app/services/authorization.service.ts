import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, share, tap } from 'rxjs';
import { Util } from './Util.service';
import { CommonService } from './common.service';
import { User } from '../classes/User';
import { Config } from '../classes/Config';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  public user: BehaviorSubject<User>;
  private util = inject(Util);
  private httpClient = inject(HttpClient);
  private commonService = inject(CommonService);

  private userSubject = new BehaviorSubject<User | null>(
    this.util.getFromStorage<User>('user')
  );

  private token = this.util.getFromStorage<string>('token');
  private refreshTokenValue = this.util.getFromStorage<string>('refreshToken');
  private rememberMe = this.util.getFromStorage<boolean>('rememberMe') ?? false;
  private sessionTimeout = this.util.getFromStorage<number>('sessionTimeout');

  private readonly storageKeys = {
    user: 'user',
    token: 'token',
    sessionTimeout: 'sessionTimeout',
    refreshToken: 'refreshToken',
    rememberMe: 'rememberMe',
  };

  private readonly url: string = (() => {
    const baseUrl = this.util.decryptText(Config.BACK_END_URL);
    return Config.USE_PROXY
      ? `${baseUrl}/manager-proxy/Users/login`
      : `${baseUrl}/api/Users/login`;
  })();

  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    }),
  };

  public user$ = this.userSubject.asObservable();

  public getUser(): User | null {
    return this.userSubject.value;
  }

  public setUser(user: User | null): void {
    this.userSubject.next(user);
    this.util.setToStorage(this.storageKeys.user, user, this.rememberMe);
  }

  public getToken(): string | null {
    return this.token;
  }

  public setToken(value: string | null): void {
    this.token = value;
    this.util.setToStorage(this.storageKeys.token, value, this.rememberMe);
  }

  public getRefreshToken(): string | null {
    return this.refreshTokenValue;
  }

  public setRefreshToken(value: string | null): void {
    this.refreshTokenValue = value;
    this.util.setToStorage(
      this.storageKeys.refreshToken,
      value,
      this.rememberMe
    );
  }

  public getRememberMe(): boolean {
    return this.rememberMe;
  }

  public setRememberMe(value: boolean): void {
    this.rememberMe = value;
    this.util.setToStorage(this.storageKeys.rememberMe, value, value);
  }

  public getSessionTimeout(): number | null {
    return this.sessionTimeout;
  }

  public setSessionTimeout(value: number | null): void {
    this.sessionTimeout = value ?? 0;
    this.util.setToStorage(
      this.storageKeys.sessionTimeout,
      value,
      this.rememberMe
    );
  }

  public login(
    username: string,
    password: string,
    unifiedLogin: boolean,
    rememberMe: boolean,
    terminateSession = false
  ): Observable<string> {
    const body = JSON.stringify({
      username,
      password,
      unifiedLogin,
      terminateSession,
    });

    return this.httpClient
      .post(this.url, body, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text',
      })
      .pipe(
        tap((data) => {
          try {
            const decodedToken: any = this.util.decodeToken(data);
            const loginInfo = JSON.parse(decodedToken.LoginInfoData);

            if (loginInfo?.Tfa_Option_Enabled) {
              this.util.navigate('/two-factor-authentication', {
                fragment: data,
              });
            } else {
              this.afterLogin(rememberMe, data);
            }
          } catch {
            this.afterLogin(rememberMe, data);
          }
        })
      );
  }

  public ssoLogin(wrapper: object): Observable<string> {
    return this.httpClient
      .post(this.url, JSON.stringify(wrapper), {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text',
      })
      .pipe(
        tap((data) => {
          this.setRememberMe(false);
          this.setToken(data);

          const decodedToken: any = this.util.decodeToken(data);
          const user = JSON.parse(decodedToken.LoginInfoData);
          user.privileges = user.privileges;
          this.setUser(user);
          this.util.navigate('/home');
        })
      );
  }

  public refreshToken(): Observable<string> {
    const params = new HttpParams(/*{ encoder: new CustomEncoder() }*/)
      .set('grant_type', 'refresh_token')
      .set('client_id', '')
      .set('client_secret', '')
      .set('refresh_token', this.getRefreshToken() ?? '');

    return this.httpClient
      .post<any>(this.url, params.toString(), this.httpOptions)
      .pipe(
        share(),
        map((data) => {
          const token = data.access_token;
          this.setUser(data.user);
          this.setToken(token);
          this.setRefreshToken(data.refresh_token);
          return token;
        })
      );
  }

  public logout(): void {
    this.setUser(null);
    this.setToken(null);
    this.setRefreshToken(null);
    this.setRememberMe(false);
    this.setSessionTimeout(null);

    Object.values(this.storageKeys).forEach((key) =>
      this.util.clearItemFromStorage(key, true, true)
    );

    this.util.navigate('/login');
    location.reload();
  }

  private afterLogin(rememberMe: boolean, data: string): void {
    this.setRememberMe(rememberMe);
    this.setToken(data);

    const decodedToken: any = this.util.decodeToken(data);
    const user = JSON.parse(decodedToken.LoginInfoData);
    user.privileges = user.privileges;
    this.setUser(user);
    this.util.navigate('/home');
  }
}
