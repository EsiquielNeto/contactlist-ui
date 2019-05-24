import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfirmationService } from 'primeng/components/common/api';

import { ContactFilter } from './../model/ContactFilter';
import { ContactsService } from '../service/contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  totalRecords = 0;
  filter = new ContactFilter();
  contacts: any[];
  @ViewChild('contactGrid') contactGrid;

  constructor(
    private confirmation: ConfirmationService,
    private contactService: ContactsService,
    private messageService: MessageService,
    private title: Title
  ) { }

  ngOnInit() {
    this.filterContacts();
    this.title.setTitle('Pesquisar contatos');
  }

  filterContacts() {
    this.contactService.filterContacts(this.filter)
      .subscribe(response => {
        this.contacts = response;
        
      });
  }

  dialogDelete(contact: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.delete(contact);
      }
    });
  }

  delete(contact: any) {
    this.contactService.delete(contact.id)
      .subscribe(() => {
        this.filterContacts();
        this.contactGrid.first = 0;

        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Contato removido com sucesso!' });
      });
  }

}