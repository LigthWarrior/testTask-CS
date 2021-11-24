import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarOwnersComponent } from './components';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services';


const matModules = [
  MatTableModule,
  MatButtonModule
];

@NgModule({
  declarations: [
    AppComponent,
    CarOwnersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    [InMemoryWebApiModule.forRoot(InMemoryDataService)],
    ...matModules,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
