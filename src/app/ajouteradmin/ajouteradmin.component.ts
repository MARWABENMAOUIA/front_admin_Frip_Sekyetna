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
    role: new FormControl('',[
      Validators.required,]),
    }
   this.AdminForm = this.fb.group(formControls)
 }
 get nom() {return this.AdminForm.get('nom');} 
get prenom() { return this.AdminForm.get('prenom');}
get email() {return this.AdminForm.get('email');}
get mdp() {return this.AdminForm.get('mdp');}
get role() {return this.AdminForm.get('role');}

 addNewAdmin() {
  let data = this.AdminForm.value;
  console.log(data);
  let admin = new Admin(
   undefined, data.nom,data.prenom,data.email,data.mdp,data.role);
  console.log(admin);
  
  if (
    data.nom == 0 ||
    data.prenom == 0||
    data.email == 0 ||
    data.mdp == 0 ||
    data.role == 0 

  ) {
    this.toast.info({
      detail: 'Error Message',
      summary: 'Remplir votre champs',
    });
  } else {
  this.service.addadmin(admin).subscribe(   // yetzed  ladmin lil base de donnée
    res=>{
      console.log(res);
      this.toast.success({
        detail: 'Succes Message',
        summary: 'Message est Envoyée',
      });
      
      //this.router.navigate(['/listAdmin']);
    },
    err=>{
      console.log(err);
      this.toast.error({
        detail: 'Error Message',
        summary: 'Probléme de Serveur',
      }); }
  )

  }
}


  ngOnInit(): void {
  }


}