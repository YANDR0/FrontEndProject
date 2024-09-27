import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';



//Children conviene más si necesitamos que compartan cosas
//Si no solo sería route a lo desgraciado
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: '**', component: NotFoundComponent}
];
