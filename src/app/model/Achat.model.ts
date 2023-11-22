import { Produit } from './Produit.model'; // Importez le modèle Produit

export class Achat {
  id: number;
  nom?: string;
  prenom?: string;
  tel?: number;
  adresse?: string;
  produit: Produit;

  constructor(
    id: number,
     nom: string,
    prenom: string,
    tel: number,
    adresse: string,
    produit: Produit,
  
  ) {
    this.id = id;
    this.produit = produit;
    this.nom = nom;
    this.prenom = prenom;
    this.tel = tel;
    this.adresse = adresse;

  }
}
