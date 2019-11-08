import { Component, OnInit, Input} from "@angular/core"
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker'
import { currentUser } from "../../../core/clientConfig"
import {CityInfo, CountryInfo} from "../../../core/models";
import { ApiService } from "../../../core/services/api.service"

import { BsLocaleService } from 'ngx-bootstrap/datepicker'
import * as moment from 'moment'
import {Router} from "@angular/router";
import {BsModalRef} from "ngx-bootstrap"
import {UserInfoService} from "../../../core/services/user-info.service";

@Component({
  selector: 'profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})

export class ProfileFormComponent implements OnInit{

  @Input()
  parentBsModalRef: BsModalRef

  locale = this.userInfo.currentUserInfo.language.lang_short //currentUser.language.lang_short;
  birthDate: string
  formGroup: FormGroup
  bsConfig: Partial<BsDatepickerConfig>
  colorTheme: string = 'theme-default'
  defaultCountryName: string = this.userInfo.currentUserInfo.country.name //currentUser.country.name
  defaultCountryId: number = this.userInfo.currentUserInfo.country.id //currentUser.country.id
  countryInfoArray: CountryInfo[]
  cityInfoArray: CityInfo[]
  regResult: any

  constructor(private formBuilder: FormBuilder,
              private api: ApiService,
              private localeService: BsLocaleService,
              private router: Router,
              private userInfo: UserInfoService) { }

  ngOnInit() {
    this.api.getCountries()
      .subscribe((data: CountryInfo[]) => {
        this.countryInfoArray = data
      })
    this.localeService.use(this.locale);
    moment.locale(this.locale)
    this.birthDate = moment(/*currentUser.birth_date*/this.userInfo.currentUserInfo.birth_date).format('LL')
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme, showWeekNumbers: false, selectFromOtherMonth: false })
    this.initForm()

    this.api.getCities(this.formGroup.controls['country'].value)
      .subscribe((nextData: CityInfo[]) => {
        this.cityInfoArray = nextData
      })
  }

  initForm(){
    this.formGroup = this.formBuilder.group({
      photo: [''],
      name: ['', [
          Validators.required
        ]
      ],
      surname: ['', [
          Validators.required
        ]
      ],
      birthDate: new Date(),
      email: ['', [
          Validators.email
      ]],
      country: [''],
      city: ['', [
          Validators.required
        ]
      ],
      gender: ['', [
          Validators.required
        ]
      ]
    })

    this.formGroup.controls['country'].setValue(this.defaultCountryId, {onlySelf: true});
  }

  onChangeCountry() {
    this.api.getCities( this.formGroup.controls['country'].value)
      .subscribe((nextData: CityInfo[]) => {
        this.cityInfoArray = nextData
      })
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName]
    const result = control.invalid && control.touched
    return result
  }

  loadLogo(event) {
    let input = event.target,
      file = input.files[0],
      self = this,
      fr = new FileReader();

    if (!file) return;
    fr.onload = function() {
      self.formGroup.controls['photo'].setValue(fr.result);
    };
    fr.readAsDataURL(file);
  }

  onSubmit() {
    const controls = this.formGroup.controls;

    this.formGroup.controls['birthDate']
      .setValue(
        moment(this.formGroup.controls['birthDate'].value)
        .format()
        .replace(/T.+/,'')
      )

    if (this.formGroup.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched())
      return
    } else {
      this.regResult = this.api.updateUserInfo(
{ name: this.formGroup.controls['name'].value,
          surname: this.formGroup.controls['surname'].value,
          birthDate: this.formGroup.controls['birthDate'].value,
          gender: this.formGroup.controls['gender'].value,
          city: this.formGroup.controls['city'].value,
          photo: this.formGroup.controls['photo'].value,
          language: this.userInfo.currentUserInfo.language.id//currentUser.language.id
        })
        .subscribe((result: any) => {
          if (result) {
            this.userInfo.updateUserInfo({name: result.name, surname: result.surname, member_id: result.member_id})
            this.parentBsModalRef.hide()
            this.parentBsModalRef = null
            this.router.navigateByUrl('/feed')
          }
        })
    }
  }
}
