import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { SearchComponent } from './components/pages/search/search.component';
import { RestaurantComponent } from './components/pages/restaurant/restaurant.component';
import { UserComponent } from './components/pages/user/user.component';
import { RestaurantReviewsComponent } from './components/pages/restaurant/restaurant-reviews/restaurant-reviews.component';
import { RestaurantConfigComponent } from './components/pages/restaurant/restaurant-config/restaurant-config.component';
import { UserListComponent } from './components/pages/user/user-list/user-list.component';
import { UserConfigComponent } from './components/pages/user/user-config/user-config.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},

    { path: 'search', component: SearchComponent},
    { path: 'search/:id', component: SearchComponent},

    { path: 'restaurant/:id', component: RestaurantComponent, children: [
        {path: 'reviews', component: RestaurantReviewsComponent},
        {path: 'config', component: RestaurantConfigComponent}
    ]},

    { path: 'user/:id', component: UserComponent, children: [
        {path: 'list', component: UserListComponent},
        {path: 'list/:id', component: UserListComponent},
        {path: 'config', component: UserConfigComponent}
    ]},

    { path: '**', component: NotFoundComponent}
];
