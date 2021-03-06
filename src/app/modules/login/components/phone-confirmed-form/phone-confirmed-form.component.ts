import { Component, OnInit } from "@angular/core"
import { BsModalService, BsModalRef } from "ngx-bootstrap"
import { SpecifyIdFormComponent } from "../specify-id-form/specify-id-form.component";
import { SignInFormComponent } from "../sign-in-form/sign-in-form.component";
import {ModalStateService} from "../../../../core/services/modal-state.service";

@Component({
  selector: 'phone-confirmed',
  templateUrl: './phone-confirmed-form.component.html',
  styleUrls: ['./phone-confirmed-form.component.css']
})
export class PhoneConfirmedFormComponent implements OnInit{

  title: string
  newReg: boolean = true

  constructor(public bsModalRef: BsModalRef,
              private modalService: BsModalService,
              private  modalState: ModalStateService) {
  }

  ngOnInit(): void {
    const initialState = {
        list: [],
        //title: 'Указать ID'
      },
      ignoreBackdropClick: boolean = true,
      backdrop: boolean = false,
      keyboard: boolean = false

    let sub = this.modalService.onHidden.subscribe(() => {
      if (!this.modalState.stopLogin) {
        this.bsModalRef = this.modalService.show(this.newReg ? SpecifyIdFormComponent : SignInFormComponent, {
          backdrop,
          initialState,
          ignoreBackdropClick,
          keyboard
        });
        this.modalState.value = this.bsModalRef
      }
      sub.unsubscribe()
    })
  }

  onNewReg() {
    this.newReg = true
    this.bsModalRef.hide()
    this.bsModalRef = null
  }

  hasAccount() {
    this.newReg = false
    this.bsModalRef.hide()
    this.bsModalRef = null
  }
}
