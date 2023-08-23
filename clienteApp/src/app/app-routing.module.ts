import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from  './views/home/home.component';
import { RegisterComponent } from './views/register/register.component';
import { UsersComponent } from './views/users/users.component'
import { PromptsComponent } from './views/prompts/prompts.component';

const routes: Routes = [
  { 
    path: '', 
    component: LoginComponent,
    title: 'Login'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register'
  },
  {
    path: 'user',
    component: UsersComponent,
    title: 'User'
  },
  {
    path: 'prompt',
    component: PromptsComponent,
    title: 'Prompt'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
