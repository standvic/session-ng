import { Component, OnInit } from "@angular/core"
import { BsModalService, BsModalRef } from "ngx-bootstrap"
import { SpecifyIdFormComponent } from "../specify-id-form/specify-id-form.component";

@Component({
  selector: 'phone-confirmed',
  templateUrl: './phone-confirmed-form.component.html',
  styleUrls: ['./phone-confirmed-form.component.css']
})
export class PhoneConfirmedFormComponent implements OnInit{

  title: string

  constructor(public bsModalRef: BsModalRef, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    const initialState = {
        list: [],
        title: 'Указать ID'
      },
      ignoreBackdropClick: boolean = true,
      backdrop: boolean = false;
    let sub = this.modalService.onHidden.subscribe(() => {
                 this.bsModalRef = this.modalService.show(SpecifyIdFormComponent, {backdrop, initialState, ignoreBackdropClick});
                 sub.unsubscribe()
               })
  }

  onNewReg() {
    this.bsModalRef.hide()
    this.bsModalRef = null
  }
}
