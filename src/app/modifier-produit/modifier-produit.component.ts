import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Produit } from '../model/Produit.model';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-modifier-produit',
  templateUrl: './modifier-produit.component.html',
  styleUrls: ['./modifier-produit.component.css']
})
export class ModifierProduitComponent {
  updateForm: FormGroup;
  imgURLs: string[] = []; 
  userFiles: FileList; // Declare userFiles


  id: number;
  //currentProduit = new Produit()
  userFile: any;
  public imagePath: any;
  imgURL: any = '';
  public message!: string;
  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private route: Router,
    private router: ActivatedRoute
  ) {


    let formControls = {
      images: new FormControl('',[
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
     this.updateForm = this.fb.group(formControls)
   }
   get images() {return this.updateForm.get('images');} 
  get nom() { return this.updateForm.get('nom');}
  get prix() { return this.updateForm.get('prix');}
  get descript() {return this.updateForm.get('descript');}
  get quantite() {return this.updateForm.get('quantite');}
  


  ngOnInit(): void {
    let idEvent = this.router.snapshot.params['id'];
    this.id = idEvent;
    console.log(idEvent)

    this.service.findProduitById(idEvent).subscribe((result) => {
      let event = result;
      console.log(event);
      this.updateForm.patchValue({
        nom: event.nom,
        prix: event.prix,
        descript: event.descript,
        images: event.images ,  

        
      });
    });
  }

  updateProduit() {
    let data = this.updateForm.value;

    let produit = new Produit(
      this.id,
      this.imgURLs,
      data.nom,
      data.prix,
      data.descript,
     
    
    );
    console.log(produit);
    console.log(data);
    this.service.updateProduit(this.id,produit).subscribe((res) => {
      console.log(res);
      this.route.navigate(['/listeProduit'])
      
      
    });
  }



  //upload Image
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
