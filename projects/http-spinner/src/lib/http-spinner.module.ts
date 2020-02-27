import { NgModule } from '@angular/core';
import { HttpSpinnerComponent } from './http-spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CommonModule} from '@angular/common';



@NgModule({
  declarations: [HttpSpinnerComponent],
  imports: [
    MatProgressSpinnerModule,
    CommonModule
  ],
  exports: [HttpSpinnerComponent]
})
export class HttpSpinnerModule { }
