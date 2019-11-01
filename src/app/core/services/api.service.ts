import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http'
import { LangInfo, CountryInfo, CityInfo } from "../../core/models"
import { URL } from '../urls'
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

  public getCities(countryId) {
    return this.http
      .get<CityInfo[]>(environment.api + URL.REST.cityInfo + '/' + countryId)
  }

  public updateUserInfo(params) {
    return this.http
      .put<any>(environment.api + URL.REST.updateUserInfo, { "user": params })
  }

  public requestCallAuth(phoneNumber) {
    return this.http
      .post<any>(environment.api + URL.REST.requestCallAuth, phoneNumber )
  }
}
