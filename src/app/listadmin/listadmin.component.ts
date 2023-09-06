import { Component } from '@angular/core';
import { Admin } from '../model/Admin.model';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-listadmin',
  templateUrl: './listadmin.component.html',
  styleUrls: ['./listadmin.component.css']
})
export class ListadminComponent {
  listadmin : Admin[]
  role:string
  constructor(private service:CrudService,private router:Router) { }
  //supprimer
  DeleteAdmin(admin: Admin){
    if(confirm("Voulez vous supprimer cet admin avec l'ID " + admin.id + " ?")) {
     
      this.service.onDeleteAdmin(admin.id).subscribe(() => {
        this.router.navigate(['/listadmin']).then(() => {
          window.location.reload()
        })
      })}}
  ngOnInit(): void {
    this.service.getAdmin().subscribe(admin => {
      this.listadmin = admin
    })
    this.role = localStorage.getItem("role") as string;
    
    console.log("role",this.role);
  }


}
