import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: About },
];
