import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../model/Admin.model';
import { Observable } from 'rxjs';
import { Client } from '../model/Client.model';
import { Contact } from '../model/Contact.model';
import { Produit } from '../model/Produit.model';
import { JwtHelperService } from '@auth0/angular-jwt';


const httpOptions={
  headers:new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})


export class CrudService {
  helper=new JwtHelperService();
  loginUserUrl="http://localhost:8081/api/admin/login"
  apiUrl="http://localhost:8081/api"

  constructor( private http:HttpClient) { }
  addadmin(admin:Admin){ // envoie une requête HTTP POST vers une URL qui se trouve à l'adresse this.apiUrl+"/admin"
    return this.http.post<any>(this.apiUrl+"/admin", admin,httpOptions);
}
addproduit(produit:Produit){ // envoie une requête HTTP POST vers une URL qui se trouve à l'adresse this.apiUrl+"/admin"
  return this.http.post<any>(this.apiUrl+"/produit", produit,httpOptions);
}
onDeleteAdmin(id : number){
  const url =`${this.apiUrl+"/admin"}/${id}` 
  return this.http.delete(url , httpOptions)
}
getAdmin(): Observable<Admin[]>{
  return this.http.get<Admin[]>(this.apiUrl + "/admin");
}
onDeleteClient(id : number){
  const url =`${this.apiUrl+"/client"}/${id}` 
  return this.http.delete(url , httpOptions)
}
getClient(): Observable<Client[]>{
  return this.http.get<Client[]>(this.apiUrl + "/client");
}
addContact(contact:Contact){ // envoie une requête HTTP POST vers une URL qui se trouve à l'adresse this.apiUrl+"/admin"
  return this.http.post<any>(this.apiUrl+"/contact", contact,httpOptions);
}
onDeleteContact(id : number){
const url =`${this.apiUrl+"/contact"}/${id}` 
return this.http.delete(url , httpOptions)
}
getContact(): Observable<Contact[]>{
return this.http.get<Contact[]>(this.apiUrl + "/contact");
}
onDeleteProduit(id : number){
  const url =`${this.apiUrl+"/produit"}/${id}` 
  return this.http.delete(url , httpOptions)
  }
  getProduit(): Observable<Produit[]>{
  return this.http.get<Produit[]>(this.apiUrl + "/produit");
  }

  loginAdmin(admin:Admin){
    return this.http.post<any>(this.loginUserUrl, admin);
  }
  isLoggedIn(){

    let token = localStorage.getItem("myToken");

    if (token) {
      return true ;
    } else {
      return false;
    }
  }
  updateProduit(id:number,produit: Produit) {
    const url = `${this.apiUrl+"/produit"}/${id}`
    return this.http.put<any>(url, produit);
  }
 
  findProduitById(id : number): Observable<Produit> {
    const url = `${this.apiUrl + "/produit"}/${id}`;
    return this.http.get<Produit>(url,httpOptions)
  }
  ///////update admin
  onupdateAdmin(id:number,admin: Admin) {
    const url = `${this.apiUrl+"/admin"}/${id}`
    return this.http.put<any>(url, admin);
  }
 
  findAdminById(id : number): Observable<Admin> {
    const url = `${this.apiUrl + "/admin"}/${id}`;
    return this.http.get<Admin>(url,httpOptions)
  }
  userDetails(){
    let token:any=localStorage.getItem('myToken');
    let decodeToken= this.helper.decodeToken(token);////decodage par token (jwt.io)
     return decodeToken.data;
   }

}
