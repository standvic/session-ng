import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginRegFormComponent } from "./components/login-reg-form/login-reg-form.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  openModalWithComponent() {
    const initialState = {
      list: [],
      title: 'Вход / регистрация'
    },
    ignoreBackdropClick: boolean = true,
    backdrop: boolean = false;

    this.bsModalRef = this.modalService.show(LoginRegFormComponent, {backdrop, initialState, ignoreBackdropClick});
    this.bsModalRef.content.closeBtnName = 'Закрыть';
  }

  ngOnInit() {
    this.openModalWithComponent()
  }

}
