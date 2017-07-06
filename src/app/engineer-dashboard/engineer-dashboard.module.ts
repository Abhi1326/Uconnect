import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../common/sharedModule";
import {EngineerDashboardComponent} from "./engineer-dashboard.component";
import {Routes, RouterModule} from "@angular/router";
import {CanActivateViaAuthGuardSupporter} from "../services/service.auth-guard";
import {AllDataResolve} from "../services/service.dataresolver";
import {SupporterDataService} from "../services/service.supporter-data";

const routeConfig:Routes=[
  {path: '',component: EngineerDashboardComponent,
    canActivate: [CanActivateViaAuthGuardSupporter],
    resolve: {
      AllData: AllDataResolve

    }
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routeConfig),
    CommonModule,SharedModule
  ],
  declarations: [EngineerDashboardComponent],
  providers:[CanActivateViaAuthGuardSupporter,AllDataResolve,SupporterDataService]
})
export class EngineerDashboardModule { }
