import { Component, OnInit } from "@angular/core"
import { BsModalService, BsModalRef } from "ngx-bootstrap"
import { SpecifyPromoIdFormComponent } from "../specify-promo-id-form/specify-promo-id-form.compomemt"
import { UserProfileFormComponent} from "../user-profile-form/user-profile-form.component";
import {ApiService} from "../../../../core/services/api.service";

@Component({
  selector: 'phone-confirmed',
  templateUrl: './specify-id-form.component.html',
  styleUrls: ['./specify-id-form.component.css']
})
export class SpecifyIdFormComponent implements OnInit{

  title: string
  disabled: boolean = true
  memberId: string
  memberPhone: string
  error: string
  toReg: boolean = false

  constructor(public bsModalRef: BsModalRef, private modalService: BsModalService, private api: ApiService) {
  }

  ngOnInit(): void {
    const initialState = {
        list: [],
        //title: 'Указать промо-код/ID'
      },
      ignoreBackdropClick: boolean = true,
      backdrop: boolean = false,
      keyboard: boolean = false

    let sub = this.modalService.onHidden.subscribe(() => {
       this.bsModalRef = this.modalService.show(this.toReg ? UserProfileFormComponent : SpecifyPromoIdFormComponent, {backdrop, initialState, ignoreBackdropClick, keyboard });
       sub.unsubscribe()
     })
  }

  setGuarantor (){
    this.api.userGuarantor({guarantor_code: this.memberId, phone: this.memberPhone})
      .subscribe(
        response => {
          if (response.status === "success") {
            this.toReg = true
            this.bsModalRef.hide()
            this.bsModalRef = null
          }
        },
        error => {
          console.log(error.error)
          this.error = error.error
        })
  }

  changed (event){
    if (this.memberId || this.memberPhone) {
      this.disabled = false
    } else {
      this.disabled = true
    }
  }

  onNewReg() {
    this.bsModalRef.hide()
    this.bsModalRef = null
  }

}
