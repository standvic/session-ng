import {Component, OnInit} from "@angular/core";
import {BsModalRef} from "ngx-bootstrap/modal";
import { HttpClient } from '@angular/common/http';
import {LangInfo, CountryInfo, AuthInfo} from '../../../../core/models'
import { URL } from '../../../../core/urls'
import { auth } from  '../../../../core/config'
import { ApiService } from "../../../../core/services/api.service"
import { Md5 } from 'ts-md5'
import lodash from 'lodash'
import {AuthService} from "../../../../core/auth/auth.service";

@Component({
  selector: 'get-sms-form',
  templateUrl: './login-reg-form.component.html',
  styleUrls: ['./login-reg-form.component.css'],
  //providers: [ApiService]
})

export class LoginRegFormComponent implements OnInit {
  title: string
  closeBtnName: string
  countryInfo: CountryInfo
  langInfo: LangInfo
  phone: number
  countryInfoArray: CountryInfo[]
  langInfoArray: LangInfo[]
  url = URL
  phoneId = 'CID-' + Md5.hashStr(lodash.map(lodash.range(1,5), Math.random).toString())
  confirmCode: string
  authInfo: AuthInfo

  constructor(private api: ApiService, private authService: AuthService, private http: HttpClient, public bsModalRef: BsModalRef) {
  }

  ngOnInit () : void {
    this.api.getLanguages()
      .subscribe((data: LangInfo[]) => {
        this.langInfoArray = data
    })

    this.api.getCountries()
      .subscribe((data: CountryInfo[]) => {
        this.countryInfoArray = data
      })
  }

  getSMSCode() : void {
  }

  submitToGetSMS(): void {
    console.log(this.phone,
      this.countryInfo,
      this.phoneId,
      this.confirmCode,
      this.countryInfoArray.filter((item) => {
        return item.id == Number(this.countryInfo)
      })[0].code,
      auth.grantDefault.grant_type,
      auth.grantDefault.client_id,
      auth.grantDefault.client_secret)
    this.authService.login(this.phone,
                           Number(this.countryInfo),
                           this.phoneId,
                           this.confirmCode,
                           this.countryInfoArray.filter((item) => {
                             return item.id == Number(this.countryInfo)
                           })[0].code,
                           auth.grantDefault.grant_type,
                           auth.grantDefault.client_id,
                           auth.grantDefault.client_secret)
      .subscribe((data: AuthInfo) => {
        this.authInfo = data
      })
  }
}

