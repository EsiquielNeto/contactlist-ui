import { Contact } from './../model/Contact';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ContactsService } from '../service/contacts.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contactlist-form',
  templateUrl: './contactlist-form.component.html',
  styleUrls: ['./contactlist-form.component.css']
})
export class ContactlistFormComponent implements OnInit {

  contactForm: FormGroup;
  contact = new Contact();

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactsService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private title: Title
  ) { }

  ngOnInit() {
    this.configureContactForm();

    let contactId = this.route.snapshot.params['id'];

    this.title.setTitle('Cadastro de contato');

    if(contactId) {
      this.loadContact(contactId);
    }
  }

  loadContact(id: number) {
    return this.contactService.findById(id).subscribe(response => {
      this.contactForm.patchValue(response);
    });
  }

  configureContactForm(){
    this.contactForm = this.formBuilder.group({
      id: [],
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.email],
      telephone: [null, Validators.required],
      twitter: [],
      skype: [],
      photo: []
    })
  }

  get editing() {
    return Boolean(this.contactForm.get('id').value);
  }

  save() {
    if (this.editing) {
      this.update();
    } else {
      this.Added();
    }
  }

  Added() {
    this.contactService.save(this.contactForm.value)
      .subscribe((response) => {
        try {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Contato adicionado com sucesso!' });

          this.contactForm.reset();
        } catch (error) {

        }
      }, error => console.log(error));
  }

  update() {
    return this.contactService.update(this.contactForm.value)
      .subscribe(response => {
        try {
          this.contactForm.patchValue(response);

          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Contato alterado com sucesso!' });
        } catch (error) {

        }
      });
  }

  editionMode(){
    this.title.setTitle(`Edição de contato`)
  }

  newContact() {
    this.contactForm.reset();

    this.contact = new Contact();
    this.contactForm.reset(this.contact);
  }

}
