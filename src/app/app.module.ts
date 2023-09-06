import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AjouteradminComponent } from './ajouteradmin/ajouteradmin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { HttpClientModule } from '@angular/common/http';
import { ListadminComponent } from './listadmin/listadmin.component';
import { ListclientComponent } from './listclient/listclient.component';
import { ListcontactComponent } from './listcontact/listcontact.component';
import { ListproduitComponent } from './listproduit/listproduit.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AjouterproduitComponent } from './ajouterproduit/ajouterproduit.component';
import { LoginComponent } from './login/login.component';
import { ModifierProduitComponent } from './modifier-produit/modifier-produit.component';
import { ModifierAdminComponent } from './modifier-admin/modifier-admin.component';
import { HomeComponent } from './statique/home.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    AjouteradminComponent,
    ListadminComponent,
    ListclientComponent,
    ListcontactComponent,
    ListproduitComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    AjouterproduitComponent,
    LoginComponent,
    ModifierProduitComponent,
    ModifierAdminComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgToastModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
