import { Component, OnInit } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { LangInfo, CountryInfo, AuthInfo } from '../../../../core/models'
import { currentUser } from "../../../../core/clientConfig"
import {environment} from "../../../../../environments/environment";
import { auth } from  '../../../../core/config'
import { ApiService } from "../../../../core/services/api.service"
import { Md5 } from 'ts-md5'
import lodash from 'lodash'
import { map, switchMap } from 'rxjs/operators'
import { AuthService } from "../../../../core/auth/auth.service";
import { PhoneConfirmedFormComponent } from "../phone-confirmed-form/phone-confirmed-form.component";
import {HttpClient} from "@angular/common/http"

@Component({
  selector: 'login-reg-form',
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
  url = environment
  phoneId = 'CID-' + Md5.hashStr(lodash.map(lodash.range(1,5), Math.random).toString())
  confirmCode: string
  authInfo: AuthInfo
  hasntSMS: boolean = true
  notGetSMS: boolean = false
  notCall: boolean = false


  constructor(private api: ApiService, private authService: AuthService, public bsModalRef: BsModalRef, private modalService:BsModalService, private http: HttpClient) {
  }

  ngOnInit () : void {
    const initialState = {
        list: [],
        title: 'Ваш номер телефона подтверждён'
      },
      ignoreBackdropClick: boolean = true,
      backdrop: boolean = false;

    let sub = this.modalService.onHidden.subscribe(() => {
                 this.bsModalRef = this.modalService.show(PhoneConfirmedFormComponent, {backdrop, initialState, ignoreBackdropClick});
                 sub.unsubscribe()
               })

    setTimeout( () => {
      this.notGetSMS =true
    }, 20000)

    this.api.getLanguages()
      .subscribe((data: LangInfo[]) => {
        this.langInfoArray = data
    })

    this.api.getCountries()
      .subscribe((data: CountryInfo[]) => {
        this.countryInfoArray = data
      })
  }

  callAuth() {
    this.notCall = true
    this.notGetSMS = false

    this.api.requestCallAuth({ "phone": this.phone })
      .pipe(
        map(result => result.check_id),
        switchMap(checkId => this.http.get<any>(
      'https://api.sessia.com/oauth/v2/token' + '/phone_number=' +
           this.phone + '&country_id=' +
           Number(this.countryInfo) + '&phone_id=1c6d3e0212c427b3A' + '&country_code=' +
           this.countryInfoArray.filter((item) => {
             return item.id == Number(this.countryInfo)
           })[0].code +
           '&grant_type=https://api.sessia.com/grant/sms_ru' +
           '&client_id=42_1zopzovrhlz4swwwgksk4g88sw40cscksk0kkkcgckccs0w00' +
           '&client_secret=246xt7lp99ogw8ss8o4swkoos8go44ogwws4kg0s8ggwckkkc8' +
           '&check_id=' + checkId
            )
        )
      )
      .subscribe(data => console.log(data))
  }

  submitToGetSMS(): void {
    this.authService.login(
       this.phone,
       Number(this.countryInfo),
       this.phoneId,
       this.confirmCode,
       this.countryInfoArray.filter((item) => {
         return item.id == Number(this.countryInfo)
       })[0].code,
       this.confirmCode,
       auth.grantDefault.grant_type,
       auth.grantDefault.client_id,
       auth.grantDefault.client_secret)
    .subscribe((data: AuthInfo) => {
      this.authInfo = data
      this.hasntSMS = false

      if(this.authService.authInfoValue.access_token) {
        Object.assign(currentUser.language, this.langInfoArray.filter((item) => {
          return item.id == Number(this.langInfo)
        })[0])
        Object.assign(currentUser.country, this.countryInfoArray.filter((item) => {
          return item.id == Number(this.countryInfo)
        })[0])

        this.bsModalRef.hide()
        this.bsModalRef = null
      }
    })
  }
}

