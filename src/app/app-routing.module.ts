import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { HelpComponent } from './help/help.component';
import { LoginComponent } from './login/login.component';
import { ServicesComponent } from './services/services.component';
import { ContextsComponent } from './contexts/contexts.component';

const routes: Routes = [
  {path:"" , component:HomeComponent },
  {path:"contact" , component:ContactComponent },
  {path:"menu" , component: MenuComponent},
  {path:"help" , component: HelpComponent},
  {path:"login" , component: LoginComponent},
  {path:"services" , component: ServicesComponent},
  {path:"contexts" , component: ContextsComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
