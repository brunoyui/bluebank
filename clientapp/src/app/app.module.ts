import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { LayoutModule } from 'ng2-flex-layout';

import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { ContaComponent } from './conta/conta.component';
import { ContaDetailComponent } from './conta-detail/conta-detail.component';
import { routing } from './app.routing';
import { ContaService } from './conta.service';


@NgModule({
  declarations: [
    AppComponent,
    ContaComponent,
    ContaDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    routing
  ],
  providers: [ContaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
