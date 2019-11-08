import { Injectable } from "@angular/core";
import {HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators"
import { SignedInUserService } from "../services/signed-in.service";

import { environment } from "../../../environments/environment";
import {AuthInfo, User} from "../models";

@Injectable({providedIn: "root"})
export class AuthService {

  private authInfoSubject: BehaviorSubject<AuthInfo>
  public authInfo: Observable<AuthInfo>
  private authMethod: string = environment.authMethod

  constructor(private http:HttpClient, private signedInUser: SignedInUserService) {
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
    this.authInfoSubject.next(null)
  }
}
