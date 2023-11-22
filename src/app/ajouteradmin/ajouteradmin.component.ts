import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Admin } from '../model/Admin.model';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-ajouteradmin',
  templateUrl: './ajouteradmin.component.html',
  styleUrls: ['./ajouteradmin.component.css']
})
export class AjouteradminComponent {
  AdminForm:FormGroup
  messageadmin=""

constructor(private service :CrudService,private router:Router,private fb:FormBuilder,private toast:NgToastService) {
  let formControls = {
    nom: new FormControl('',[
      Validators.required,]),
    prenom: new FormControl('',[
      Validators.required,]),
   
    email: new FormControl('',[
      Validators.required,
      Validators.email]),
    mdp: new FormControl('',[
      Validators.required,]),
   
    }
   this.AdminForm = this.fb.group(formControls)
 }
 get nom() {return this.AdminForm.get('nom');} 
get prenom() { return this.AdminForm.get('prenom');}
get email() {return this.AdminForm.get('email');}
get mdp() {return this.AdminForm.get('mdp');}

 addNewAdmin() {
  let data = this.AdminForm.value;
  console.log(data);
  let admin = new Admin(
   undefined, data.nom,data.prenom,data.email,data.mdp);
  console.log(admin);
  
  if (
    data.nom == 0 ||
    data.prenom == 0||
    data.email == 0 ||
    data.mdp == 0 

  ) {
 
    this.messageadmin='<div class="alert alert-primary" role="alert" > Remplir votre champs </div> '

  } else {
  this.service.addadmin(admin).subscribe(   // yetzed  ladmin lil base de donnée
    res=>{
      console.log(res);
      this.messageadmin = '<div class="alert alert-success" role="alert">Message est Envoyée</div>';

  
      
      //this.router.navigate(['/listAdmin']);
    },
    err=>{
      console.log(err);
      this.messageadmin='<div class="alert alert-danger" role="alert" > Error adding Admin </div> '

    }
  )

  }
}


  ngOnInit(): void {
  }


}
