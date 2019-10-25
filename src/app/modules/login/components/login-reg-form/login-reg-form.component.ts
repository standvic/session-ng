import { Component, OnInit } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { LangInfo, CountryInfo, AuthInfo } from '../../../../core/models'
import { currentUser } from "../../../../core/clientConfig"
import {environment} from "../../../../../environments/environment";
import { auth } from  '../../../../core/config'
import { ApiService } from "../../../../core/services/api.service"
import { Md5 } from 'ts-md5'
import lodash from 'lodash'
import { AuthService } from "../../../../core/auth/auth.service";
import { PhoneConfirmedFormComponent } from "../phone-confirmed-form/phone-confirmed-form.component";

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

  constructor(private api: ApiService, private authService: AuthService, public bsModalRef: BsModalRef, private modalService:BsModalService) {
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

    this.api.getLanguages()
      .subscribe((data: LangInfo[]) => {
        this.langInfoArray = data
    })

    this.api.getCountries()
      .subscribe((data: CountryInfo[]) => {
        this.countryInfoArray = data
      })
  }

  submitToGetSMS(): void {
    this.authService.login(this.phone,
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

          console.log('LOGOUTING...')
          this.authService.logout()

          this.bsModalRef.hide()
          this.bsModalRef = null
        }
      })
  }
}

