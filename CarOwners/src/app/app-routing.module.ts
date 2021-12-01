import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarOwnersComponent, CruFormComponent } from './components';

const routes: Routes = [
  {
    path: '', component: CarOwnersComponent, children: [
      {path: '', redirectTo: 'records', pathMatch: 'full'},
      {path: 'records', component: CruFormComponent},
    ]
  },
  {
    path: 'record', component: CruFormComponent
  },
  {
    path: 'records/:id', component: CruFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
