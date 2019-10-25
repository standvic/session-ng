// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  root: 'http://www.sessia.local/',
  appRoot: 'http://www.sessia.local/web-version',
  api: 'http://api.sessia.local/api/',
  authMethod: 'http://api.sessia.local/oauth/v2/token',
  privacyPolicyPage: 'https://www.sessia.com/privacy_policy.html',
  userAgreementRuPage: 'https://www.sessia.com/user_agreement_ru.html',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
