import { Route } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AppComponent} from "./app.component";

export const appRoutes: Route[] = [
    {
        path: '',
        component: LoginComponent,
    }
];
