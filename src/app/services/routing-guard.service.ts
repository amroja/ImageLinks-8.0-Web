import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Config } from '../classes/Config';
import { AuthorizationService } from './authorization.service';

export const RoutingGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authorizationService = inject(AuthorizationService);

  let goingTo = state.url;
  if (goingTo.includes('?')) {
    goingTo = goingTo.substring(0, goingTo.indexOf('?'));
  }
  const user = authorizationService.getUser();
  debugger;
  if (user) {
    if (next.data['right'] && !user.privileges.includes(next.data['right'])) {
      if (user.userId === Config.APPLICATION_ADMIN_RID) {
        return true;
      }
      return false;
    }
    // if (next.component === LoginComponent) {
    //   router.navigate(['/']);
    //   return false;
    // }
  } else {
    if (next.data['requireUser'] || next.data['right']) {
      router.navigate(['/login']);
      return false;
    }
  }

  return true;
};
