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
  id: number;
  currentProduit = new Produit()
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
     this.updateForm = this.fb.group(formControls)
   }
   get img() {return this.updateForm.get('img');} 
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
        quantite: event.quantite,
        img: event.img ,  

        
      });
    });
  }

  updateProduit() {
    let data = this.updateForm.value;

    let produit = new Produit(
      this.id,
      this.imgURL,
      data.nom,
      data.prix,
      data.descript,
      data.quantite,
     
    
    );
    console.log(produit);
    console.log(data);
    this.service.updateProduit(this.id,produit).subscribe((res) => {
      console.log(res);
      this.route.navigate(['/listeProduit'])
      
      
    });
  }



  //upload Image
  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      // this.f['profile'].setValue(file);

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
