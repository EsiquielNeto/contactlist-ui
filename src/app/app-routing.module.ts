import { ContactlistFormComponent } from './contactlist-form/contactlist-form.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'contatos',pathMatch: 'full' },
  { path: 'contatos', component: ContactListComponent },
  { path: 'contatos/novo', component: ContactlistFormComponent },
  { path: 'contatos/:id', component: ContactlistFormComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
