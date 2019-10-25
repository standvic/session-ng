import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators"

import { environment } from "../../../environments/environment";
import {AuthInfo, User} from "../models";
import {analyticsPackageSafelist} from "@angular/cli/models/analytics";

@Injectable({providedIn: "root"})
export class AuthService {

  private authInfoSubject: BehaviorSubject<AuthInfo>
  public authInfo: Observable<AuthInfo>
  private authMethod: string = environment.authMethod//'https://api.sessia.com/oauth/v2/token'

  constructor(private http:HttpClient) {
    this.authInfoSubject = new BehaviorSubject<AuthInfo>(JSON.parse(localStorage.getItem('authInfo')))
    this.authInfo = this.authInfoSubject.asObservable()
  }

  public get authInfoValue(): AuthInfo {
    return this.authInfoSubject.value
  }

  public login(phone_number: number,
               country_id: number,
               phone_id: string,
               confirm_code: string,
               country_code: string,
               validation_code: string,
               grant_type: string,
               client_id: string,
               client_secret: string) {
    let params = new HttpParams()
      .set('phone_number', phone_number.toString())
      .set('country_id', country_id.toString())
      .set('phone_id', phone_id)
      .set('confirm_code', confirm_code)
      .set('country_code', country_code)
      .set('validation_code', validation_code)
      .set('grant_type', grant_type)
      .set('client_id', client_id)
      .set('client_secret', client_secret)
    return this.http.get<AuthInfo>(this.authMethod, {params: params})
      .pipe(map(auInf => {
        localStorage.setItem('authInfo', JSON.stringify(auInf))
        this.authInfoSubject.next(auInf)
        return auInf
      }))
  }

  public logout() {
    localStorage.removeItem('authInfo')
    this.authInfoSubject.next(null)
  }
}
