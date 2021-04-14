import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule}  from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageService}  from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactsService } from './service/contacts.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactlistFormComponent } from './contactlist-form/contactlist-form.component';
import { MessageComponent } from './message/message.component';
import { ErroHandlerComponent } from './erro-handler/erro-handler.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    NavbarComponent,
    ContactlistFormComponent,
    MessageComponent,
    ErroHandlerComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    ButtonModule,
    ConfirmDialogModule,
    FileUploadModule,
    InputTextModule,
    InputMaskModule,
    TableModule,
    ToastModule
  ],
  providers: [
    ContactsService,
    ConfirmationService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
