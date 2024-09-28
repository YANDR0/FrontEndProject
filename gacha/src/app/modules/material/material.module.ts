import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], 
  exports: [
    MatCardModule, 
    MatIconModule, MatButtonModule
  ]
})
export class MaterialModule { }
