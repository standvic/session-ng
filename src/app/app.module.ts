import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { HTTP_INTERCEPTORS} from "@angular/common/http"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { RouterModule } from '@angular/router';
import { LayoutModule } from './core/layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { CachingInterceptor } from "./core/interceptors/caching-interceptor.service"
import { JwtInterceptor } from "./core/interceptors/jwt.interceptor"

import { defineLocale } from 'ngx-bootstrap/chronos';
import { ruLocale } from 'ngx-bootstrap/locale';
defineLocale('ru', ruLocale);

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    FlexLayoutModule,
    LayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
              { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor,     multi: true },
              { provide: LocationStrategy, useClass: HashLocationStrategy }
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
