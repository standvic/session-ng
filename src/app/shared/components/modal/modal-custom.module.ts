import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap';

import { ModalContentComponent } from './modal-content.component';
import { ModalComponent } from './modal.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  declarations: [ModalContentComponent, ModalComponent],
  entryComponents: [ModalContentComponent, ModalComponent]
})
export class ModalCustomModule { }
