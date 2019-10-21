import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import { ModalModule } from 'ngx-bootstrap';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {LoginRegFormComponent} from "./components/login-reg-form/login-reg-form.component";
//import { ApiService } from "../../core/services/api.service"


@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  //providers: [ApiService],
  declarations: [LoginComponent, LoginRegFormComponent],
  entryComponents: [LoginRegFormComponent]
})
export class LoginModule { }
