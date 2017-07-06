/**
 * Created by consultadd on 23/11/16.
 */
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {AuthService} from "./service.auth";

@Injectable()
export class CanActivateViaAuthGuardAdmin implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate() {
    if(this.authService.isadmin()){
      return true
    }
    else{
      this.authService.logout()
      return false
    }


  }
}
@Injectable()
export class CanActivateViaAuthGuardSupporter implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate() {

    return this.authService.isAuthenticated();
  }
}
