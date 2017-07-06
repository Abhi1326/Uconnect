
import {Injectable} from '@angular/core';
import {Http,} from '@angular/http';
import 'rxjs/Rx';
import {contentHeaders} from "../common/headers";
import {Observable} from "rxjs/Observable";
import {URLS} from "../common/url-constant";
import {Router} from "@angular/router";
import {EmitterService} from "./service.emitter";




@Injectable()
export class RestService {

  static movies = {
    city:null,
    result:null,
    date:null
  };
  constructor(public http: Http ,private _router:Router) {

  }
  get(url:string):Observable<any> {

    this.setHeader();

    return this.http.get(url, { headers: contentHeaders } ).map(
      (response) =>
        this.sendResponse(response)

    ).catch(this.handleErrorObservable);
  }


  get_by_params(url:string, params_query:any) :Promise<any>{
    return this.http.get(url, { search: params_query }).toPromise().then(
      (response) => this.sendResponse(response)
    ).catch(this.handleError);
  }

  post(url:string, data?):Observable<any>  {

    if(url!=URLS.LOGIN && url!=URLS.SIGNUP){
      this.setHeader();
    }else{
      contentHeaders.delete('Authorization');
    }

    return this.http.post(url, data, { headers: contentHeaders }).map(
      (response) => {
        if(!contentHeaders.has('Content-Type')) {

        contentHeaders.append('Content-Type', 'application/json')
      }
        return this.sendResponse(response)
      }

    ).catch(this.handleErrorObservable);
  }
  // request_post(url:string, data?):Observable<any>  {
  //
  //   if(url!=URLS.LOGIN && url!=URLS.SIGNUP){
  //     this.setHeader();
  //   }else{
  //     contentHeaders.delete('Authorization');
  //   }
  //
  //   return this.http.post(url, data, { headers: contentHeaders }).map(
  //     (response) => this.sendResponse(response)
  //
  //   ).catch(this.handleAnyError);
  //
  // }

  patch(url:string, object, id):Observable<any>{
    this.setHeader();
    let obj = JSON.stringify(object);
    return this.http.patch(url + id +'/', obj,  { headers: contentHeaders })
      .map(
        (response) => this.sendResponse(response)
      ).catch(this.handleErrorObservable);
  }

  put(url:string, object):Observable<any>{
    this.setHeader();
    return this.http.put(url, object,  { headers: contentHeaders })
      .map(
        (response) => {

          if(!contentHeaders.has('Content-Type')) {

            contentHeaders.append('Content-Type', 'application/json')
          }
          else{
            contentHeaders.set('Content-Type', 'application/json')
          }
          return this.sendResponse(response)
        }
      ).catch(this.handleErrorObservable);
  }


  getCookie(name: string) {
    // let value = "; " + document.cookie;
    // let parts = value.split("; " + name + "=");
    // if (parts.length == 2)
    //   return parts.pop().split(";").shift();

    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = name + "=";
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s\+/g, "");
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return "";

  }

  setHeader(){

    let key = localStorage.getItem('key');
    if( key ){

      contentHeaders.delete('X-CSRFToken');
      contentHeaders.append('X-CSRFToken', this.getCookie('csrftoken'));


      let aKey = contentHeaders.get('Authorization');
      if(aKey==null || aKey==undefined || aKey=="") {
        contentHeaders.append('Authorization', 'token ' + key);
      }else{
        contentHeaders.delete('Authorization');
        contentHeaders.append('Authorization', 'token ' + key);
      }
    }

    /******get city from localstorage an set into headers******/

    let city = JSON.parse(localStorage.getItem('city'));

    if(city){
      let aCity = contentHeaders.get('city');
      if(aCity==null || aCity==undefined || aCity=="") {
        contentHeaders.append('city', city['name']);
      }else{
        contentHeaders.delete('city');
        contentHeaders.append('city', city['name']);
      }
    }

    /******get location from localstorage an set into headers******/


    let location = JSON.parse(localStorage.getItem('location'));
    if(location){
      let alatitude = contentHeaders.get('latitude');
      if(alatitude==null || alatitude==undefined || alatitude=="") {
        contentHeaders.append('latitude', location['latitude']);

      }
      else{
        contentHeaders.delete('latitude');
        contentHeaders.append('latitude', location['latitude']);
      }

      let alongitude = contentHeaders.get('longitude');
      if(alongitude==null || alongitude==undefined || alongitude=="") {
        contentHeaders.append('longitude', location['longitude']);

      }
      else{
        contentHeaders.delete('longitude');
        contentHeaders.append('longitude', location['longitude']);
      }

    }

  }


  sendResponse(response){
    return response.json();

  }
  private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error || '500';
    let errorCode = JSON.parse(error._body).error_code;
    // log to console instead
    return Promise.reject(errorCode);
  }

  private handleAnyError(error:any){
    return Observable.throw(error);
  }

  private handleErrorObservable (error: any) {
    console.log(error,'==========>')
    if(error.status==401){
          localStorage.clear();
        console.log("hello")

      EmitterService.get("logout").emit(true)
      // Clear the Authorization key from request headers
      contentHeaders.delete('Authorization');

      // Clear the cookies
      // this.setCookie(name, "", -1);

      // Delete the X-CSRFToken key from request headers
      contentHeaders.delete('X-CSRFToken');
      location.reload()
      return

    }
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = JSON.parse(error._body)|| '500';
    /******** to check the minimum amount error only for error code 907 ****/
    if(errMsg == "907"){
      let err_obj = JSON.parse(error._body);
      return Observable.throw(err_obj);
    }
    /*********************************************/
    return Observable.throw(errMsg);
  }


}
