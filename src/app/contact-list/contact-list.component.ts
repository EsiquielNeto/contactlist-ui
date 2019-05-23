import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';

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
  contacts: [];
  @ViewChild('contactGrid') contactGrid;

  constructor(
    private confirmation: ConfirmationService,
    private contactService: ContactsService,
    private messageService: MessageService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisar contatos');
  }

  changePage(event: LazyLoadEvent) {
    console.log(this.contactGrid);
    let page = event.first / event.rows;
    this.searchContacts(page);
  }

  searchContacts(page = 0) {
    this.filter.page = page;

    this.contactService.filterContacts(this.filter)
      .then(response => {
        this.totalRecords = response.total;
        this.contacts = response.contacts;
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
        this.searchContacts();
        this.contactGrid.first = 0;

        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Contato removido com sucesso!' });
      });
  }


}