import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap';

import { ModalContentComponent } from './modal-content.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  declarations: [ModalContentComponent],
  entryComponents: [ModalContentComponent]
})
export class ModalContentModule { }
