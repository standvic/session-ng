import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from '../../shared/components/modal-content/modal-content.component'

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
      list: [
        'Open a modal-content with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Вход / регистрация'
    },
    ignoreBackdropClick: boolean = true,
    backdrop: boolean = false;

    this.bsModalRef = this.modalService.show(ModalContentComponent, {backdrop, initialState, ignoreBackdropClick});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  ngOnInit() {
    this.openModalWithComponent()
  }

}
