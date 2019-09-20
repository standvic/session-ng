import {Component, OnInit} from "@angular/core";
import {BsModalRef} from "ngx-bootstrap/modal";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'get-sms-form',
  templateUrl: './login-reg-form.component.html',
  styleUrls: ['./login-reg-form.component.css']
})

export class LoginRegFormComponent implements OnInit {
  title: string
  closeBtnName: string
  country: CountryInfo
  language: LangInfo

  constructor(private http: HttpClient, public bsModalRef: BsModalRef) {
  }

  ngOnInit () : void {
    this.http.get('https://api.sessia.com/api/language').subscribe((data : LangInfo) => {
      this.language = data
    });

    this.http.get('https://api.sessia.com/api/directory/countries?version=v2').subscribe((data : CountryInfo) => {
      this.country = data
    });
  }
}

class LangInfo
{
  id: number
  name: string
  lang_short: string
  android_translation_name: string
  ios_translation_name: string
}

class CountryInfo {
  name: string
  code: string
  icon: string
  lang: string
  pickup: boolean
  delivery: boolean
  id: number
  mask: string
  default_currency : {
    id: number
    code: string
    show_code: string
    left_currency_symbol_placement: boolean
    sort: number
  }
}


