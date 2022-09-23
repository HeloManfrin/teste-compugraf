import { CadastroModule } from './cadastro/cadastro.module';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  NgModule,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule,
    CommonModule,
    HomeModule,
    CadastroModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'R$' },
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
  ],
})
export class AppModule {}
