import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CrudService } from '../service/crud.service';
import { Produit } from '../model/Produit.model';

@Component({
  selector: 'app-ajouterproduit',
  templateUrl: './ajouterproduit.component.html',
  styleUrls: ['./ajouterproduit.component.css']
})
export class AjouterproduitComponent {
  userFile:any
  imagePath:any
  imgURL:any
  message:any
  ProduitForm:FormGroup
  constructor(private service :CrudService,private router:Router,private fb:FormBuilder,private toast:NgToastService) {
    let formControls = {
      img: new FormControl('',[
        Validators.required,]),
      nom: new FormControl('',[
        Validators.required,]),
     
      prix: new FormControl('',[
        Validators.required,
      ]),
        descript: new FormControl('',[
        Validators.required,]),
        quantite: new FormControl('',[
        Validators.required,]),
      }
     this.ProduitForm = this.fb.group(formControls)
   }
   get img() {return this.ProduitForm.get('img');} 
  get nom() { return this.ProduitForm.get('nom');}
  get prix() { return this.ProduitForm.get('prix');}
  get descript() {return this.ProduitForm.get('descript');}
  get quantite() {return this.ProduitForm.get('quantite');}
  
   addNewProduit() {
    let data = this.ProduitForm.value;
    console.log(data);
    let produit = new Produit(
     undefined, this.imgURL,data.nom,data.prix,data.descript,data.quantite);
    console.log(produit);
    
    if (
      this.imgURL == 0 ||
      data.nom == 0||
      data.prix == 0 ||
      data.descript == 0 ||
      data.quantite == 0 
  
    ) {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Remplir votre champs',
      });
    } else {
    this.service.addproduit(produit).subscribe(   // yetzed  ladmin lil base de donnée
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
    onSelectFile(event: any) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.userFile = file;
    
  
        var mimeType = event.target.files[0].type;
        if (mimeType.match(/image\/*/) == null) {
          this.message = 'Only images are supported.';
          return;
        }
  
        var reader = new FileReader();
  
        this.imagePath = file;
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          this.imgURL = reader.result;
        };
      }
    }
  
  }
  


