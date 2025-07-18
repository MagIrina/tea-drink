import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgbCollapseModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    NgbCollapseModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
  ]
})
export class SharedModule { }
