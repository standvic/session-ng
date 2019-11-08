import { Component, OnInit } from "@angular/core";
import { UserProfileFormComponent} from "../user-profile-form/user-profile-form.component";
import { RemainPasswordFormComponent } from "../remain-password-form/remain-password-form.component";
import {BsModalService, BsModalRef } from "ngx-bootstrap";
import { AuthService } from "../../../../core/auth/auth.service";
import { Router} from "@angular/router";
import { currentUser} from "../../../../core/clientConfig";

@Component({
  selector: 'sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit{

  emailContract: string
  password: string
  disabled: boolean = true
  signedIn: boolean = false
  remind: boolean = false
  error: string

  constructor(public bsModalRef: BsModalRef,
              private modalService: BsModalService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    const initialState = {
        list: []
      },
      ignoreBackdropClick: boolean = true,
      backdrop: boolean = false,
      keyboard: boolean = false

    let sub = this.modalService.onHidden.subscribe(() => {
      if (!this.signedIn) {
        this.bsModalRef = this.modalService.show(this.remind ? RemainPasswordFormComponent : UserProfileFormComponent, { backdrop, initialState, ignoreBackdropClick, keyboard });
        sub.unsubscribe()
      }
    })
  }

  signIn() {
    this.authService.login(
      {
        email: this.emailContract,
        password: this.password,
        phone: currentUser.user_phones[0],
        phone_id: '1c6d3e0212c427b3A',
        grant_type: 'https://api.sessia.com/grant/email',
        client_id: '17_f3j2lpkvec8c8gcg8ccoc84gkkss4wwc4ssk4o4ggk4c00844',
        client_secret: '673e4egz8nksskgs0kwck84o4g8oc0ccc8084wwccsk0gkkkg'
      })
      .subscribe((authInfo) => {
        this.signedIn = true
        this.bsModalRef.hide()
        this.bsModalRef = null
        this.router.navigateByUrl('/feed')

      },
        errorInfo => {
          this.error = errorInfo.error.error_description
        })
  }

  remindPassword() {
    this.remind = true
    this.bsModalRef.hide()
    this.bsModalRef = null
  }

  newReg() {
    this.remind = false
    this.bsModalRef.hide()
    this.bsModalRef = null
  }

  changed() {
    if (this.emailContract || this.password) {
      this.disabled = false
    } else {
      this.disabled = true
    }
  }
}
