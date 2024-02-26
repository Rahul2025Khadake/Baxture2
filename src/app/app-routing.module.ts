import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlistComponent } from './userlist/userlist.component';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', redirectTo: '/maincomponent', pathMatch: 'full' },
  { path: 'maincomponent', component: MainComponent },
  { path: 'userslist', component: UserlistComponent },
  { path: '**', title: 'Page NOt Found ', component: PageTransitionEvent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
