import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginRegFormComponent } from "./components/login-reg-form/login-reg-form.component";
import { ModalStateService } from "../../core/services/modal-state.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService,
              private  modalState: ModalStateService) {}

  openModalWithComponent() {
    const initialState = {
      list: [],
    },
    ignoreBackdropClick: boolean = true,
    backdrop: boolean = false,
    keyboard: boolean = false

    this.bsModalRef = this.modalService.show(LoginRegFormComponent, {backdrop, initialState, ignoreBackdropClick, keyboard });
    this.modalState.value = this.bsModalRef
    this.modalState.stopLogin = false
  }

  ngOnInit() {
    this.openModalWithComponent()
  }

}
