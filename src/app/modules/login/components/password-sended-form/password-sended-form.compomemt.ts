import { Component, OnInit } from "@angular/core"
import { BsModalService, BsModalRef } from "ngx-bootstrap"
import {ModalStateService} from "../../../../core/services/modal-state.service";
import {SignInFormComponent} from "../sign-in-form/sign-in-form.component";

@Component({
  selector: 'password-sended',
  templateUrl: './password-sended-form.component.html',
  styleUrls: ['./password-sended-form.component.css']
})
export class PasswordSendedFormCompomemt implements OnInit{

  title: string

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
        this.bsModalRef = this.modalService.show( SignInFormComponent, {
          backdrop,
          initialState,
          ignoreBackdropClick,
          keyboard
        });
      }
      sub.unsubscribe()
    })
  }

  ok() {
    this.bsModalRef.hide()
    this.bsModalRef = null
  }

}
