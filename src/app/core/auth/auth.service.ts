import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators"
import { SignedInUserService } from "../services/signed-in.service";

import { environment } from "../../../environments/environment";
import { AuthInfo } from "../models";
import { ModalStateService } from "../services/modal-state.service";
import { Router } from "@angular/router";

@Injectable({providedIn: "root"})
export class AuthService {

  private authInfoSubject: BehaviorSubject<AuthInfo>
  public authInfo: Observable<AuthInfo>
  private authMethod: string = environment.authMethod

  constructor(private http:HttpClient,
              private signedInUser: SignedInUserService,
              private modalState: ModalStateService,
              private router: Router) {
    this.authInfoSubject = new BehaviorSubject<AuthInfo>(JSON.parse(localStorage.getItem('authInfo')))
    this.authInfo = this.authInfoSubject.asObservable()
  }

  public get authInfoValue(): AuthInfo {
    return this.authInfoSubject.value
  }

  public login(params) {
    return this.http.get<AuthInfo>(this.authMethod, {params: params})
      .pipe(map(auInf => {
        localStorage.setItem('authInfo', JSON.stringify(auInf))
        this.authInfoSubject.next(auInf)
        if (auInf.access_token) {
          this.signedInUser.IsUserSignedIn.next(true)
        }
        return auInf
      }))
  }

  public logout() {
    localStorage.removeItem('authInfo')
    this.signedInUser.IsUserSignedIn.next(false)
    if (this.modalState.value) {
      this.modalState.del()
      //this.modalState.stopLogin = true
      this.router.navigateByUrl('/login')
    }
    this.authInfoSubject.next(null)
  }
}
