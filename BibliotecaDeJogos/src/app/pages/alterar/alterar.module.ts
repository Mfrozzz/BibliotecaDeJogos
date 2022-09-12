import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlterarPageRoutingModule } from './alterar-routing.module';

import { AlterarPage } from './alterar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AlterarPageRoutingModule
  ],
  declarations: [AlterarPage]
})
export class AlterarPageModule {}
