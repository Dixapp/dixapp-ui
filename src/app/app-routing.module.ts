import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicLayoutComponent } from "./layouts/basic-layout/basic-layout.component";
import { MainComponent } from "./cah/views/main/main.component";
import { AuthGuard } from "./access/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'app', component: BasicLayoutComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'cah', pathMatch: 'full' },
    { path: 'cah', component: MainComponent }
  ]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
