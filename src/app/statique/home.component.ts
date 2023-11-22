import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Admin } from '../model/Admin.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  totaladmin:number=0
  totalclient:number=0
  totalproduit:number=0
  constructor(
   
    private service: CrudService,
    private route: Router,
   
  ){}
ngOnInit():void{
  this.service.getAdmin().subscribe(admin=>
  {this.totaladmin=admin.length})



    this.service.getProduit().subscribe(produit=>
      {this.totalproduit=produit.length})
}

}
