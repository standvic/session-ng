import {Component, OnInit} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {
  title: string;
  closeBtnName: string;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }
}
