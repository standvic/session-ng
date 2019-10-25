import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from "@angular/forms"
import { ModalModule } from 'ngx-bootstrap'

import { LoginRoutingModule } from './login-routing.module'
import { LoginComponent } from './login.component'
import { LoginRegFormComponent } from "./components/login-reg-form/login-reg-form.component"
import { PhoneConfirmedFormComponent } from "./components/phone-confirmed-form/phone-confirmed-form.component"
import { SpecifyIdFormComponent } from "./components/specify-id-form/specify-id-form.component"
import { SpecifyPromoIdFormComponent } from "./components/specify-promo-id-form/specify-promo-id-form.compomemt"
import { UserProfileFormComponent } from "./components/user-profile-form/user-profile-form.component"
import { ProfileFormComponent } from "../../shared/components/form/profile-form.component"
import { ReactiveFormsModule } from "@angular/forms"

//import { ApiService } from "../../core/services/api.service"


@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  //providers: [ApiService],
  declarations: [LoginComponent, LoginRegFormComponent, PhoneConfirmedFormComponent,
                 SpecifyIdFormComponent, SpecifyPromoIdFormComponent, UserProfileFormComponent,
                 ProfileFormComponent],
  entryComponents: [LoginRegFormComponent, PhoneConfirmedFormComponent, SpecifyIdFormComponent,
                    SpecifyPromoIdFormComponent, UserProfileFormComponent]
})
export class LoginModule { }
