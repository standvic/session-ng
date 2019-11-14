import { Component, OnInit } from "@angular/core";
import { ModalStateService } from "../../core/services/modal-state.service";


@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  constructor(private modalState: ModalStateService) {
  }

  ngOnInit(): void {

    if (this.modalState.value) {
      this.modalState.del()
    }
  }

}
