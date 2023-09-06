import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouteradminComponent } from './ajouteradmin/ajouteradmin.component';
import { ListadminComponent } from './listadmin/listadmin.component';
import { ListclientComponent } from './listclient/listclient.component';
import { ListcontactComponent } from './listcontact/listcontact.component';
import { ListproduitComponent } from './listproduit/listproduit.component';
import { AjouterproduitComponent } from './ajouterproduit/ajouterproduit.component';
import { LoginComponent } from './login/login.component';
import { ModifierProduitComponent } from './modifier-produit/modifier-produit.component';
import { AuthGuard } from './service/auth-guard.service';
import { ModifierAdminComponent } from './modifier-admin/modifier-admin.component';
import { HomeComponent } from './statique/home.component';

const routes: Routes = [
  { path: '', component: AjouteradminComponent, canActivate: [AuthGuard] },
  {
    path: 'ajouterproduit',
    component: AjouterproduitComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'listadmin',
    component: ListadminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'listclient',
    component: ListclientComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'listcontact',
    component: ListcontactComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'listproduit',
    component: ListproduitComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'modifierproduit/:id',
    component: ModifierProduitComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'modifieradmin/:id',
    component: ModifierAdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },

  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
