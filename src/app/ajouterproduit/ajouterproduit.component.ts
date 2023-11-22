import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Produit } from '../model/Produit.model';

@Component({
  selector: 'app-ajouterproduit',
  templateUrl: './ajouterproduit.component.html',
  styleUrls: ['./ajouterproduit.component.css'],
})
export class AjouterproduitComponent {
  ProduitForm: FormGroup;
  imgURLs: string[] = []; // Declare imgURLs
  userFiles: FileList; // Declare userFiles
  message: string;
  messageproduit=""

  constructor(
    private service: CrudService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    let formControls = {
      images: new FormControl('', [Validators.required]),
      nom: new FormControl('', [Validators.required]),
      prix: new FormControl('', [Validators.required]),
      descript: new FormControl('', [Validators.required]),
    };
    this.ProduitForm = this.fb.group(formControls);
  }

  get images() {
    return this.ProduitForm.get('images');
  }
  get nom() {
    return this.ProduitForm.get('nom');
  }
  get prix() {
    return this.ProduitForm.get('prix');
  }
  get descript() {
    return this.ProduitForm.get('descript');
  }

  addNewProduit() {
    let data = this.ProduitForm.value;
    let produit = new Produit(
      undefined ,
      this.imgURLs,
      data.nom,
      data.prix,
      data.descript,
    );
    console.log('Produit with Images:', produit);

    if (
      data.images === '' ||
      data.nom === '' ||
      data.prix === '' ||
      data.descript === '' ||
      data.quantite === ''
    ) {
      this.messageproduit = '<div class="alert alert-primary" role="alert">Remplir tous les champs</div>';
    } else {
      this.service.addProduit(produit).subscribe(
        (result) => {
          this.messageproduit = '<div class="alert alert-success" role="alert">Product added successfully</div>';
          console.log('Product added successfully:', result);
        },
        (error) => {
          this.messageproduit = '<div class="alert alert-danger" role="alert">Error adding Product</div>';
          console.error('Error adding product:', error);
        }
      );
    }
  }
  onSelectFiles(event: any) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      this.userFiles = files;
  
      const loadImagePromises: Promise<string>[] = [];
  
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        var mimeType = file.type;
        if (mimeType.match(/image\/*/) == null) {
          this.message = 'Only images are supported.';
          return;
        }
  
        loadImagePromises.push(this.loadImageAsDataURL(file));
      }
  
      Promise.all(loadImagePromises)
        .then((result) => {
          console.log('Image URLs:', result);
          this.imgURLs = result;
        })
        .catch((error) => {
          console.error('Error loading images:', error);
        });
    }
  }
  
  loadImageAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        resolve(event.target.result as string);
      };
  
      reader.onerror = (event) => {
        reject(event.target.error);
      };
  
      reader.readAsDataURL(file);
    });
  }
  
  
}
