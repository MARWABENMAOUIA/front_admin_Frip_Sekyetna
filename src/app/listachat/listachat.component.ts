import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';
import { Achat } from '../model/Achat.model';

@Component({
  selector: 'app-listachat',
  templateUrl: './listachat.component.html',
  styleUrls: ['./listachat.component.css']
})
export class ListachatComponent implements OnInit {
  achats: Achat[];
  // achatsParClient: { [clientId: number]: Achat[] } = {};

  constructor(private service: CrudService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getAllAchats();

  }


  getAllAchats(): void {
    this.service.getAllAchats().subscribe(
      (achats) => {
        this.achats = achats;
        this.cdr.detectChanges(); // Force la détection des modifications
      },
      (error) => {
        console.error(error);
      }
    );
  }
 
  supprimerAchatParId(achat: Achat){
    if(confirm("Voulez vous supprimer cet achat ?")) {
     
      this.service.supprimerAchat(achat.id).subscribe(() => {
        this.router.navigate(['/listachat']).then(() => {
          window.location.reload()
        })
      })}}



  
}


