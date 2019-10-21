
class Account {
  guarantor_code: string
  member_id: string
  cheque_whole_period: number
  struct_whole_period_sum: number
}

class userPhones {
  phone_number: string
  country_id: string
}

class CountryId {
  id: number
}

class City {
  id: number
  ru_name: string
  country: CountryId
}

class Rate {
  id: number
  rate: number
  os_type: number
  os_version: string
  app_build: string
  rate_date: Date
  next_rate_date: Date
}



export class CountryInfo {
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

export class LangInfo
{
  id: number
  name: string
  lang_short: string
  android_translation_name: string
  ios_translation_name: string
}

export class User {
  id: number
  guarantor_code: string
  member_id: string
  account_id: number
  name: string
  surname: string
  birth_date: Date
  created_date: Date
  gender: number
  accounts: Account[]
  user_phones: userPhones[]
  photo: string
  city: City
  country: CountryInfo
  language: LangInfo
  rate: Rate
}

export class AuthInfo {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  token_type: string
}
