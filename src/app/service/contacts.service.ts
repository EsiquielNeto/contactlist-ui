import { Contact } from './../model/Contact';
import { Injectable } from '@angular/core';

import { ContactFilter } from '../model/ContactFilter';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private urlContact = 'http://localhost:8080/contacts';

  constructor(private http: HttpClient) { }

  filterContacts(filter: ContactFilter): Observable<any[]> {
    let params = new HttpParams({
      fromObject: {}
    });

    if (filter.name) {
      params = params.append('name', filter.name);
    }

    if (filter.lastName) {
      params = params.append('lastName', filter.lastName);
    }

    if (filter.telephone) {
      params = params.append('telephone', filter.telephone);
    }

    return this.http.get<any[]>(`${this.urlContact}`, { params });
  }

  findById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.urlContact}/${id}`);
  }

  uploadPhoto(): string {
    return `${this.urlContact}/upload-photo`;
  }

  save(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.urlContact}`, contact);
  }

  update(contact: Contact): Observable<any> {
    return this.http.put<Contact>(`${this.urlContact}/${contact.id}`, contact);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlContact}/${id}`);
  }
}
