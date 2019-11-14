import { Component, OnInit } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { LangInfo, CountryInfo, AuthInfo } from '../../../../core/models'
import {environment} from "../../../../../environments/environment";
import { auth } from  '../../../../core/config'
import { ApiService } from "../../../../core/services/api.service"
import { Md5 } from 'ts-md5'
import lodash from 'lodash'
import { AuthService } from "../../../../core/auth/auth.service";
import { PhoneConfirmedFormComponent } from "../phone-confirmed-form/phone-confirmed-form.component";
import { Router } from "@angular/router";
import { UserInfoService } from "../../../../core/services/user-info.service";
import { SignedInUserService } from "../../../../core/services/signed-in.service";
import { ModalStateService } from "../../../../core/services/modal-state.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'login-reg-form',
  templateUrl: './login-reg-form.component.html',
  styleUrls: ['./login-reg-form.component.css'],
})

export class LoginRegFormComponent implements OnInit {

  title: string
  formGroup: FormGroup
  phone: number
  countryCode: string
  countryInfoArray: CountryInfo[]
  langInfoArray: LangInfo[]
  url = environment
  phoneId = 'CID-' + Md5.hashStr(lodash.map(lodash.range(1,5), Math.random).toString())
  confirmCode: string
  authInfo: AuthInfo
  hasntSMS: boolean = true
  notGetSMS: boolean = false
  notCall: boolean = false
  isUserSignedId: boolean = false
  error: string


  constructor(private api: ApiService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              public bsModalRef: BsModalRef,
              private modalService:BsModalService,
              private router: Router,
              private userInfo: UserInfoService,
              private signedIn: SignedInUserService,
              private  modalState: ModalStateService) {
  }

  ngOnInit () : void {
    const initialState = {
        list: []
      },
      ignoreBackdropClick: boolean = true,
      backdrop: boolean = false,
      keyboard: boolean = false

    let sub = this.modalService.onHidden.subscribe(() => {
       if (!this.modalState.stopLogin) {
         this.bsModalRef = this.modalService.show(PhoneConfirmedFormComponent, {backdrop, initialState, ignoreBackdropClick, keyboard});
         this.modalState.value = this.bsModalRef
       }
       sub.unsubscribe()
     })

    this.signedIn.IsUserSignedIn.subscribe( value => {
      this.isUserSignedId = value
    })

    this.api.getLanguages()
      .subscribe((data: LangInfo[]) => {
        this.langInfoArray = data
        this.userInfo.updateUserInfo({
          language: this.langInfoArray.filter((item) => {
            return item.lang_short == window.navigator.language
          })[0]
        })
      })

    this.api.getCountries()
      .subscribe((data: CountryInfo[]) => {
        this.countryInfoArray = data
      })

    this.initForm()
  }

  initForm(){
    this.formGroup = this.formBuilder.group({
      langInfo: [''],
      countryInfo: [''],
      phone: ['']
    })

    this.userInfo.currentUser
      .subscribe(value => {
        this.formGroup.controls['langInfo'].setValue(value.language.id, {onlySelf: true});
      })
  }

  changeCountry(event) {
    this.countryCode = this.countryInfoArray.
                         filter((item) => {
                            return item.id == Number(event.target.value)
                          })[0].code
  }

  callAuth() {
    this.notCall = true
    this.notGetSMS = false

    this.api.requestCallAuth({ "phone": this.formGroup.controls['phone'].value.replace(/[\(,\),\s,\-]/g, '') })
      .subscribe(data => {
        if (data.check_id) {
          let timer = setInterval( () => {
            this.authService.login(
              {
                phone_number: this.formGroup.controls['phone'].value.replace(/[\(,\),\s,\-]/g, ''),
                country_id: this.formGroup.controls['countryInfo'].value,
                phone_id: '1c6d3e0212c427b3A',
                country_code: this.countryInfoArray.filter((item) => {
                  return item.id == Number(this.formGroup.controls['countryInfo'].value)
                })[0].code,
                grant_type: 'https://api.sessia.com/grant/sms_ru',
                client_id: '1zopzovrhlz4swwwgksk4g88sw40cscksk0kkkcgckccs0w00',
                client_secret: '246xt7lp99ogw8ss8o4swkoos8go44ogwws4kg0s8ggwckkkc8',
                check_id: data.check_id
              })
              .subscribe((authInfo) => {
                clearInterval(timer);
                this.router.navigateByUrl('/feed')
              })
          }, 5000)
        }
      })
  }

  submitToGetSMS() {
    this.authService.login(
      {
        phone_number: this.formGroup.controls['phone'].value.replace(/[\(,\),\s,\-]/g, ''),
        country_id: this.formGroup.controls['countryInfo'].value,
        phone_id: this.phoneId,
        confirm_code: this.confirmCode,
        country_code: this.countryInfoArray.filter((item) => {
          return item.id == Number(this.formGroup.controls['countryInfo'].value)
        })[0].code,
        validation_code: this.confirmCode,
        grant_type: auth.grantDefault.grant_type,
        client_id: auth.grantDefault.client_id,
        client_secret: auth.grantDefault.client_secret
      })
    .subscribe(
      (data: AuthInfo) => {
        this.authInfo = data
        this.hasntSMS = false

        setTimeout(() => {
          this.notGetSMS = true
        }, 20000)

        if (this.isUserSignedId) {
          let phones: Number[] = [0]
          phones[0] = this.formGroup.controls['phone'].value.replace(/[\(,\),\s,\-]/g, '')
          this.userInfo.updateUserInfo({
            language: this.langInfoArray.filter((item) => {
              return item.id == Number(this.formGroup.controls['langInfo'].value)
            })[0],
            country: this.countryInfoArray.filter((item) => {
              return item.id == Number(this.formGroup.controls['countryInfo'].value)
            })[0],
            user_phones: phones
          })

          this.bsModalRef.hide()
          this.bsModalRef = null
        }
      },
      (message: any) => {
        this.error = message.error.error_description
      } )
  }
}

