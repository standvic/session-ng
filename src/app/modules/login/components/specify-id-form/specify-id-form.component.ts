import { Component, OnInit } from "@angular/core"
import { BsModalService, BsModalRef } from "ngx-bootstrap"
import { SpecifyPromoIdFormComponent } from "../specify-promo-id-form/specify-promo-id-form.compomemt"

@Component({
  selector: 'phone-confirmed',
  templateUrl: './specify-id-form.component.html',
  styleUrls: ['./specify-id-form.component.css']
})
export class SpecifyIdFormComponent implements OnInit{

  title: string

  constructor(public bsModalRef: BsModalRef, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    const initialState = {
        list: [],
        title: 'Указать промо-код/ID'
      },
      ignoreBackdropClick: boolean = true,
      backdrop: boolean = false;
    let sub = this.modalService.onHidden.subscribe(() => {
                 this.bsModalRef = this.modalService.show(SpecifyPromoIdFormComponent, {backdrop, initialState, ignoreBackdropClick});
                 sub.unsubscribe()
               })
  }

  onNewReg() {
    this.bsModalRef.hide()
    this.bsModalRef = null
  }

}
