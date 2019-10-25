import { Component, OnInit } from "@angular/core"
import { BsModalService, BsModalRef } from "ngx-bootstrap"
import { UserProfileFormComponent } from "../user-profile-form/user-profile-form.component"

@Component({
  selector: 'phone-confirmed',
  templateUrl: './specify-promo-id-form.component.html',
  styleUrls: ['./specify-promo-id-form.component.css']
})
export class SpecifyPromoIdFormComponent implements OnInit{

  title: string

  constructor(public bsModalRef: BsModalRef, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    const initialState = {
        list: [],
        title: 'Ваши данные'
      },
      ignoreBackdropClick: boolean = true,
      backdrop: boolean = false;
    let sub = this.modalService.onHidden.subscribe(() => {
      this.bsModalRef = this.modalService.show(UserProfileFormComponent, {backdrop, initialState, ignoreBackdropClick});
      sub.unsubscribe()
    })
  }

  onNewReg() {
    this.bsModalRef.hide()
    this.bsModalRef = null
  }

}
