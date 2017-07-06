/**
 * Created by consultadd on 17/11/16.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EngineersProfileComponent} from "./engineers-profile/engineers-profile.component";
import { CanActivateViaAuthGuardSupporter} from "./services/service.auth-guard";
import {CustomPreloadingStrategy} from "./services/service.custompreloadstrategy";
import {
  SupporterResolve, AllSupporterResolve, AllConsultantResolve,
  ConsultantResolve, AllProjectResolve, ProjectResolve, UserResolve
} from "./services/service.dataresolver";
import {LoginComponent} from "./login/login.component";
import {SupporterlistComponent} from "./supporterlist/supporterlist.component";
import {ProjectlistComponent} from "./projectlist/projectlist.component";
import {ProjectDetailComponent} from "./project-detail/project-detail.component";



import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {NotificationsComponent} from "./notifications/notifications.component";


/*
 export  function loadMovie(){
 return  require('es6-promise!./+movie/movie.module')('MovieModule');
 }
 {path: '', redirectTo: '/movies',pathMatch: 'full'},

 */


export const routes: Routes = [
  {
    path:'form/:type',
    loadChildren: "app/form/form.module#FormModule",
    canActivate: [CanActivateViaAuthGuardSupporter],
    data: {preload: true}
  },
  {
    path: 'Home',
    loadChildren: "app/admin-dashboard/admin-dashboard.module#AdminDashboardModule",
    data: {preload: true}
  },
  {
    path: 'dashboard',
    loadChildren: "app/engineer-dashboard/engineer-dashboard.module#EngineerDashboardModule",
    data: {preload: true}
  },
  {path: '',component:LoginComponent},

  {
    path: 'detail/:id',
    component:ProjectDetailComponent,
    canActivate: [CanActivateViaAuthGuardSupporter],
    resolve: {
      projectdata: ProjectResolve
    }
  },

  {path: 'reset/:uid/:token',component:ResetPasswordComponent},
  {path: 'supporterlist',component:SupporterlistComponent,
    canActivate: [CanActivateViaAuthGuardSupporter],
    resolve: {
      allsupporter: AllSupporterResolve}
  },
  {path: 'supporterlist/:id',redirectTo: 'supporterlist', pathMatch: 'full'

  },
  {path: 'consultantlist',component:SupporterlistComponent,
    canActivate: [CanActivateViaAuthGuardSupporter],
    resolve: {
      allconsultant: AllConsultantResolve}
  },

  {path: 'projectlist',component:ProjectlistComponent,
    canActivate: [CanActivateViaAuthGuardSupporter],
    resolve: {
      allproject: AllProjectResolve
    }
  },
  {
    path: 'profile/supporter/:id',
    component:EngineersProfileComponent,
    canActivate: [CanActivateViaAuthGuardSupporter],
    resolve: {
    supporterdata: SupporterResolve
  }
  },
  {
    path: 'profile/consultant/:id',
    component: EngineersProfileComponent,
    canActivate: [CanActivateViaAuthGuardSupporter],
    resolve: {
      supporterdata: ConsultantResolve
    }
  },
  {
    path: 'notification',
    component:NotificationsComponent,
    canActivate: [CanActivateViaAuthGuardSupporter],
  },
];
export const appRoutingProviders: any[] = [CustomPreloadingStrategy,
  ConsultantResolve, AllProjectResolve,ProjectResolve,SupporterResolve,
  UserResolve];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes,{ preloadingStrategy: CustomPreloadingStrategy });
