import {Injectable} from "@angular/core";
import  { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"
import { AuthService} from "./auth.service";

@Injectable({providedIn: "root"})
export class AuthGuard implements CanActivate{

  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    const authInfo = this.authService.authInfoValue;
    if (authInfo && authInfo.access_token) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

