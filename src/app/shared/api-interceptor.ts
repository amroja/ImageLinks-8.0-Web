import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';
import { CommonService } from '../services/common.service';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Util } from '../services/Util.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastType } from '../classes/ToastType';

export const APIInterceptor: HttpInterceptorFn = (req, next) => {
  const util = inject(Util);
  const translatePipe = inject(TranslateService);
  const authorizationService = inject(AuthorizationService);
  const commonServices = inject(CommonService);
  return next(req).pipe(
    tap(() => {}),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authorizationService.logout();
        return throwError(() => error);
      } else {
        util.createToast(
          translatePipe.instant('somethingWrong'),
          ToastType.ERROR
        );
        return throwError(() => error);
      }
    })
  );
};
