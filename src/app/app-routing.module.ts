import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicLayoutComponent } from "./layouts/basic-layout/basic-layout.component";
import { GamesPanelComponent } from "./views/games-panel/games-panel.component";
import { DixitComponent } from "./dixio/views/dixit/dixit.component";
import { AuthGuard } from "./access/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'app', component: BasicLayoutComponent, canActivate: [AuthGuard], children: [
    { path: 'gamespanel', component: GamesPanelComponent },
    { path: 'dixit', component: DixitComponent }
  ]}

  // {
  //   path: 'sensors', component: BasicLayoutComponent, canActivate: [AuthGuard],
  //   children: [
  //     {path: 'list', component: SensorsComponent},
  //     {path: 'charts', component: ChartsComponent}
  //   ]
  // }
  //
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
