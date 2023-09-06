import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../model/Contact.model';

import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-listcontact',
  templateUrl: './listcontact.component.html',
  styleUrls: ['./listcontact.component.css']
})
export class ListcontactComponent {
  listcontact : Contact[]
  constructor(private service:CrudService,private router:Router) { }
  //supprimer
  DeleteContact(contact: Contact){
    if(confirm("Voulez vous supprimer cet contact avec l'ID " + contact.id + " ?")) {
     
      this.service.onDeleteContact(contact.id).subscribe(() => {
        this.router.navigate(['/listcontact']).then(() => {
          window.location.reload()
        })
      })}}
  ngOnInit(): void {
    this.service.getContact().subscribe(contact => {
      this.listcontact = contact
    })
  }

}
