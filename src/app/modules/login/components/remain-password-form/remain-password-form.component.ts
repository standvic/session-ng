import { Component, OnInit } from "@angular/core";
import { UserProfileFormComponent} from "../user-profile-form/user-profile-form.component";
import {BsModalService, BsModalRef} from "ngx-bootstrap";
import {ApiService} from "../../../../core/services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'sign-in-form',
  templateUrl: './remain-password-form.component.html',
  styleUrls: ['./remain-password-form.component.css']
})
export class RemainPasswordFormComponent implements OnInit{

  disabled: boolean = true
  reminded: boolean = false
  email: string
  contract: string
  phone: string
  invalidEmail: string
  invalidPhone: string

  constructor(public bsModalRef: BsModalRef,
              private modalService: BsModalService,
              private api: ApiService,
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
      if (!this.reminded) {
        this.bsModalRef = this.modalService.show(UserProfileFormComponent, { backdrop, initialState, ignoreBackdropClick, keyboard });
        sub.unsubscribe()
      }
    })
  }

  remind() {
    this.api.usersRemind({email: this.email, member_id: this.contract, phone: this.phone})
      .subscribe(
        data => {
          this.reminded = true
          this.bsModalRef.hide()
          this.bsModalRef = null
          this.router.navigateByUrl('/feed')
        },
        error => {
          this.invalidEmail = error.error.details.email
          this.invalidPhone = error.error.details.phone
        })

  }

  newReg() {
    this.reminded = false
    this.bsModalRef.hide()
    this.bsModalRef = null
  }

  changed() {
    if (this.email || this.contract || this.phone) {
      this.disabled = false
    } else {
      this.disabled = true
    }
  }
}
