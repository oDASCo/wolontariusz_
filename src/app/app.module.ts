import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { PointsComponent } from './points/points.component';
import { UsefullLinksComponent } from './usefull-links/usefull-links.component';
import { NavComponent } from './shared/nav/nav.component';
import { HereBlockComponent } from './shared/here-block/here-block.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './shared/header/header.component';
import {MatCardModule} from "@angular/material/card";
import { PointComponent } from './points/point/point.component';
import { PointsListComponent } from './points/points-list/points-list.component';
import {MatInputModule} from "@angular/material/input";
import { AddShiftComponent } from './schedule/add-shift/add-shift.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ShiftsTableComponent } from './schedule/shifts-table/shifts-table.component';
import {MatNativeDateModule} from "@angular/material/core";
import { RegistrationComponent } from './registration/registration.component';
import {MatTabsModule} from "@angular/material/tabs";
import {AppService} from "./app.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./helpers/auth.interceptor";
import {MatBadgeModule} from "@angular/material/badge";
import { InfoDialogComponent } from './shared/header/info-dialog/info-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { TextDialogComponent } from './home/text-dialog/text-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ScheduleComponent,
    PointsComponent,
    UsefullLinksComponent,
    NavComponent,
    HereBlockComponent,
    LoginComponent,
    HeaderComponent,
    PointComponent,
    PointsListComponent,
    AddShiftComponent,
    ShiftsTableComponent,
    RegistrationComponent,
    InfoDialogComponent,
    AdminPanelComponent,
    TextDialogComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        MatMenuModule,
        MatListModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCardModule,
        MatInputModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        FormsModule,
        MatNativeDateModule,
        MatTabsModule,
        HttpClientModule,
        MatBadgeModule,
        MatDialogModule,
        MatTableModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatAutocompleteModule
    ],
  entryComponents: [InfoDialogComponent, TextDialogComponent],
  providers: [AppService, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
