import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};







// import { inject } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
// import { AuthService } from './auth.service';
// import { Router } from 'express';
// import { catchError } from 'rxjs';

// export const authGuard: CanActivateFn = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   return authService.IsLoggedIn().pipe(
//     map(() => true),
//     catchError(() => {
//       router.navigate([])
//     })
//   );
// };

// export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);