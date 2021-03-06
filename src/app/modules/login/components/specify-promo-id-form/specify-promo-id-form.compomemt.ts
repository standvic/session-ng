import { Component, OnInit } from "@angular/core"
import { BsModalService, BsModalRef } from "ngx-bootstrap"
import { UserProfileFormComponent } from "../user-profile-form/user-profile-form.component"
import { SpecifyIdFormComponent } from "../specify-id-form/specify-id-form.component";
import {ModalStateService} from "../../../../core/services/modal-state.service";

@Component({
  selector: 'phone-confirmed',
  templateUrl: './specify-promo-id-form.component.html',
  styleUrls: ['./specify-promo-id-form.component.css']
})
export class SpecifyPromoIdFormComponent implements OnInit{

  title: string
  getBonus: boolean = false

  constructor(public bsModalRef: BsModalRef,
              private modalService: BsModalService,
              private  modalState: ModalStateService) {
  }

  ngOnInit(): void {
    const initialState = {
        list: [],
        //title: 'Ваши данные'
      },
      ignoreBackdropClick: boolean = true,
      backdrop: boolean = false,
      keyboard: boolean = false

    let sub = this.modalService.onHidden.subscribe(() => {
      if (!this.modalState.stopLogin) {
        this.bsModalRef = this.modalService.show(this.getBonus ? SpecifyIdFormComponent : UserProfileFormComponent, {
          backdrop,
          initialState,
          ignoreBackdropClick,
          keyboard
        });
      }
      sub.unsubscribe()
    })
  }

  putMember() {
    this.getBonus = true
    this.bsModalRef.hide()
    this.bsModalRef = null
  }

  onNewReg() {
    this.getBonus = false
    this.bsModalRef.hide()
    this.bsModalRef = null
  }

}
