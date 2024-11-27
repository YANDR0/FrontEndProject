import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { SearchComponent } from './components/pages/search/search.component';
import { RestaurantComponent } from './components/pages/restaurant/restaurant.component';
import { UserComponent } from './components/pages/user/user.component';
import { RestaurantReviewsComponent } from './components/pages/restaurant/restaurant-reviews/restaurant-reviews.component';
import { UserListComponent } from './components/pages/user/user-list/user-list.component';
import { UserConfigComponent } from './components/pages/user/user-config/user-config.component';
import { LoginComponent } from './components/pages/login/login.component';
import { CreateRestaurantComponent } from './components/pages/create-restaurant/create-restaurant.component';
import { RestaurantOverviewComponent } from './components/pages/restaurant/restaurant-overview/restaurant-overview.component';
import { UserOverviewComponent } from './components/pages/user/user-overview/user-overview.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { VerifyComponent } from './components/pages/verify/verify.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'search', component: SearchComponent },
    { path: 'search/:id', component: SearchComponent },
    { path: 'create-restaurant', component: CreateRestaurantComponent },
    { path: 'create-restaurant/:id', component: CreateRestaurantComponent },
    { path: 'verify', component: VerifyComponent },
    {
        path: 'restaurant/:id', component: RestaurantComponent, children: [
            { path: '', component: RestaurantOverviewComponent },
            { path: 'reviews', component: RestaurantReviewsComponent }
        ]
    },

    {
        path: 'user/:id', component: UserComponent, children: [
            { path: '', component: UserOverviewComponent },
            { path: 'list', component: UserListComponent },
            { path: 'list/:id', component: UserListComponent },
            { path: 'config', component: UserConfigComponent }
        ]
    },

    { path: '**', component: NotFoundComponent }
];
