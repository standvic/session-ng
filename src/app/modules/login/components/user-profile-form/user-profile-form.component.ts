import { Component } from "@angular/core"
import { BsModalRef } from "ngx-bootstrap"

@Component({
  selector: 'user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.css']
})

export class UserProfileFormComponent {

  title: string

  constructor(public bsModalRef: BsModalRef) {
  }

}
