import { User } from "./models"

export let currentUser: User = {
  id: 0,
  guarantor_code: '',
  member_id: '',
  account_id: 0,
  name: '',
  surname: '',
  birth_date: new Date(),
  created_date: new Date(),
  gender: 0,
  accounts: [],
  user_phones: [],
  photo: '',
  city: {
    id: 0,
    ru_name: '',
    countryId: 0,
    regionId: 0
  },
  country: {
    name: '',
    code: '',
    icon: '',
    lang: '',
    pickup: false,
    delivery: false,
    id: 0,
    mask: '',
    default_currency : {
      id: 0,
      code: '',
      show_code: '',
      left_currency_symbol_placement: false,
      sort: 0
    }
  },
  language: {
    id: 0,
    name: '',
    lang_short: '',
    android_translation_name: '',
    ios_translation_name: '',
  },
  rate: {
    id: 0,
    rate: 0,
    os_type: 0,
    os_version: '',
    app_build: '',
    rate_date: new Date(),
    next_rate_date: new Date()
  }
}
