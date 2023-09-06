import { Component } from '@angular/core';
import { Client } from '../model/Client.model';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listclient',
  templateUrl: './listclient.component.html',
  styleUrls: ['./listclient.component.css']
})
export class ListclientComponent {
  listclient : Client[]
  constructor(private service:CrudService,private router:Router) { }
  //supprimer
  DeleteClient(client:Client){
    if(confirm("Voulez vous supprimer cet client avec l'ID " + client.id + " ?")) {
     
      this.service.onDeleteClient(client.id).subscribe(() => {
        this.router.navigate(['/listclient']).then(() => {
          window.location.reload()
        })
      })}}
  ngOnInit(): void {
    this.service.getClient().subscribe(client => {
      this.listclient = client
    })
  }

}
