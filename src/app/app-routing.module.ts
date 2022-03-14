import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ScheduleComponent} from "./schedule/schedule.component";
import {UsefullLinksComponent} from "./usefull-links/usefull-links.component";
import {PointsComponent} from "./points/points.component";
import {PointComponent} from "./points/point/point.component";
import {PointsListComponent} from "./points/points-list/points-list.component";
import {AddShiftComponent} from "./schedule/add-shift/add-shift.component";
import {ShiftsTableComponent} from "./schedule/shifts-table/shifts-table.component";
import {LoginComponent} from "./login/login.component";
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'schedule', canActivate: [AuthGuard], component: ScheduleComponent, children: [
      {path: '', component: ShiftsTableComponent},
      {path: 'add-shift', component: AddShiftComponent},
    ]},

  {path: 'points', canActivate: [AuthGuard], component: PointsComponent, children: [
      {path: '', component: PointsListComponent},
      {path: ':point', component: PointComponent}
    ]},
  {path: 'links', canActivate: [AuthGuard], component: UsefullLinksComponent},
  {path: 'admin', canActivate: [AuthGuard], component: AdminPanelComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
