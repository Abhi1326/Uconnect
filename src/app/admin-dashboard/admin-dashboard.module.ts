import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from "@angular/router";
import {AdminDashboardComponent} from "./admin-dashboard.component";
import { MaterialModule } from '@angular/material';
import {ReactiveFormsModule, FormsModule} from "@angular/forms"
import {AllDataResolve} from "../services/service.dataresolver";
import {AgmCoreModule} from "angular2-google-maps/core";


import {CanActivateViaAuthGuardSupporter, CanActivateViaAuthGuardAdmin} from "../services/service.auth-guard";
import {SharedModule} from "../common/sharedModule";
import { EngineersListTileComponent } from './engineers-list-tile/engineers-list-tile.component';
import { ProjectListTileComponent } from './project-list-tile/project-list-tile.component';





const routeConfig:Routes=[
   {path: '',component: AdminDashboardComponent,
     canActivate: [CanActivateViaAuthGuardSupporter,CanActivateViaAuthGuardAdmin],
     resolve: {
    AllData: AllDataResolve

  }
   },
]

@NgModule({
  imports: [
    CommonModule,RouterModule.forChild(routeConfig),
    MaterialModule.forRoot(),
    ReactiveFormsModule,
    AgmCoreModule.forRoot({apiKey:"AIzaSyCQwmfoU0EpmFZ6dpidKi52q83_bCXTEQk"}),
    FormsModule,
    SharedModule



  ],
  declarations: [AdminDashboardComponent, EngineersListTileComponent, ProjectListTileComponent],
  providers:[AllDataResolve,CanActivateViaAuthGuardSupporter,CanActivateViaAuthGuardAdmin],
  exports:[AdminDashboardComponent],
})
export class AdminDashboardModule { }
