import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http'
import { LangInfo } from "../../core/models"
import { CountryInfo } from "../../core/models"
import { URL } from '../urls'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  public getLanguages() {
    return this.http
      .get<LangInfo[]>(environment.api + URL.REST.langInfo)
  }

  public getCountries() {
    return this.http
      .get<CountryInfo[]>(environment.api + URL.REST.countryInfo)
  }
}
