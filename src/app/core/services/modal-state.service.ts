import { Injectable } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap";

@Injectable({
  providedIn: "root"
})
export  class ModalStateService {

  bsModalRef: BsModalRef
  stopLogingIn: boolean

  constructor() {

  }

  public get stopLogin() {
    return this.stopLogingIn
  }

  public set stopLogin(value: boolean) {
    this.stopLogingIn = value
  }

  public get value() {
    return this.bsModalRef
  }

  public set value(modalHandler: BsModalRef) {
    this.bsModalRef = modalHandler
  }

  public del() {
    this.stopLogingIn = true
    this.bsModalRef.hide()
    this.bsModalRef = null
  }
}
