/**
 * Created by consultadd on 24/11/16.
 */
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {SupporterDataService} from "./service.supporter-data";
import {Observable} from "rxjs/Rx";
import {ConsultantDataService} from "./service.consultant-data";
import {ProjectDataService} from "./service.project-data";
import {isNull} from "util";
import {NotificationDataService} from "./service.widgets";
import {error} from "util";



@Injectable()
export class SupporterResolve implements Resolve<any> {

  constructor(private supporterService: SupporterDataService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.supporterService.getsupporter(route.params['id']);
  }
}
@Injectable()
export class AllDataResolve implements Resolve<any> {

  constructor(private supporterService:SupporterDataService ) {
  }

  resolve(route:ActivatedRouteSnapshot) {

    return this.supporterService.getadmindata()


  }
}
@Injectable()
export class AllSupporterResolve implements Resolve<any> {

  constructor(private supporterService: SupporterDataService) {}

  resolve(route: ActivatedRouteSnapshot):Observable<any> {
    return this.supporterService.getallsupporterdata();
  }
}
@Injectable()
export class ProjectResolve implements Resolve<any> {

  constructor(private projectService: ProjectDataService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.projectService.getproject(route.params['id']);
  }
}
@Injectable()
export class UserResolve implements Resolve<any> {

  constructor(private supporterService: SupporterDataService) {}

  resolve(route: ActivatedRouteSnapshot) {
    console.log(route.params['uid']);
    console.log(route.params['token']);
    return true
  }
}

@Injectable()
export class AllProjectResolve implements Resolve<any> {

  constructor(private projectService: ProjectDataService) {}

  resolve(route: ActivatedRouteSnapshot):Observable<any> {

    return this.projectService.getallprojectdata();
  }
}

@Injectable()
export class AllConsultantResolve implements Resolve<any> {

  constructor(private consultantService: ConsultantDataService) {}

  resolve(route: ActivatedRouteSnapshot):Observable<any> {

    return this.consultantService.getallconsultantdata();
  }
}


@Injectable()
export class ConsultantResolve implements Resolve<any> {

  constructor(private consultantService: ConsultantDataService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.consultantService.getconsultant(route.params['id']);
  }
}


