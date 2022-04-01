import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundError } from 'rxjs';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PostsComponent } from './pages/posts/posts.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ChatComponent } from './pages/chat/chat.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  { path:'', redirectTo: 'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path:'signup', component: SignupComponent },
  { path:'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path:'posts', component: PostsComponent, canActivate: [AuthGuard] },
  { path: 'chat', component: ChatComponent },
  { path: 'mainPage', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'users/:userId/posts', component: PostsComponent, canActivate: [AuthGuard] },
  { path:'**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
