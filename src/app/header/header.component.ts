import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Route, Router } from '@angular/router';
import { Contact } from '../model/Contact.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  listcontact : Contact[]
  userDetails:any;
  constructor(
    private service:CrudService,
    private router :Router
  ){
    this.userDetails = this.service.userDetails();
  }
  logout(){
    console.log("logout");
    localStorage.clear()
    this.router.navigate(['/login']);
    
  }
  ngOnInit(): void {
    console.log(this.userDetails);
    this.service.getContact().subscribe(contact => {
      this.listcontact = contact   })
  }



}
