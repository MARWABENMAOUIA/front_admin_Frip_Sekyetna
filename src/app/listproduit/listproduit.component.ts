import { Component } from '@angular/core';
import { Produit } from '../model/Produit.model';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listproduit',
  templateUrl: './listproduit.component.html',
  styleUrls: ['./listproduit.component.css']
})
export class ListproduitComponent {
  listproduit : Produit[]
  p:number=1
  collection:any[]
  constructor(private service:CrudService,private router:Router) { }
  //supprimer
  DeleteProduit(produit: Produit){
    if(confirm("Voulez vous supprimer cet produit avec l'ID ?")) {
     
      this.service.onDeleteProduit(produit.id).subscribe(() => {
        this.router.navigate(['/listproduit']).then(() => {
          window.location.reload()
        })
      })}}
  ngOnInit(): void {
    this.service.getProduit().subscribe(produits  => {
      this.listproduit = produits;
      this.getLatestProducts();
    })
  }
  getLatestProducts() {
    // Triez les produits par ID de manière décroissante
    this.listproduit.sort((a, b) => b.id - a.id);}
  }
  
