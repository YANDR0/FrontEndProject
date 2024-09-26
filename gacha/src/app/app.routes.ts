import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { RestComponent } from './components/pages/rest/rest.component';
import { UserComponent } from './components/pages/user/user.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { RestAboutComponent } from './components/pages/rest/rest-about/rest-about.component';
import { RestReviewsComponent } from './components/pages/rest/rest-about/rest-reviews/rest-reviews.component';
import { RestConfigComponent } from './components/pages/rest/rest-about/rest-config/rest-config.component';
import { RestDetailsComponent } from './components/pages/rest/rest-details/rest-details.component';
import { UserListComponent } from './components/pages/user/user-list/user-list.component';
import { UserConfigComponent } from './components/pages/user/user-config/user-config.component';
import { UserListDetailsComponent } from './components/pages/user/user-list/user-list-details/user-list-details.component';


//Children conviene más si necesitamos que compartan cosas
//Si no solo sería route a lo desgraciado
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'restaurant', component: RestComponent}, 
    { path: 'restaurant/:id', component: RestAboutComponent},
    { path: 'restaurant/:id/reviews', component: RestReviewsComponent},
    { path: 'restaurant/:id/config', component: RestConfigComponent},
    { path: 'search/:id', component: RestDetailsComponent },
    { path: 'user/:id', component: UserComponent},
    { path: 'user/:id/config', component: UserConfigComponent},
    { path: 'user/:id/list', component: UserListComponent},
    { path: 'user/:id/list/:id', component: UserListDetailsComponent },
    { path: '**', component: NotFoundComponent}
];
