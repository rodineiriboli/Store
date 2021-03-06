import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './item/form/form.component';
import { ListComponent } from './item/list/list.component';

const routes: Routes = [
  {path: '', component: FormComponent},
  {path: 'item/form', component: FormComponent},
  {path: 'item/list', component: ListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
