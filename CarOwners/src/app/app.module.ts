import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarOwnersComponent } from './components';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

const matModules = [
  MatTableModule,
  MatButtonModule
];

@NgModule({
  declarations: [
    AppComponent,
    CarOwnersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ...matModules,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
