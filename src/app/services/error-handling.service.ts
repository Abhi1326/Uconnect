import {Component, Injectable, Injector,Inject, provide} from '@angular/core';
import {Router,Route} from '@angular/router';
import {UtilsService, EmitterService} from './utils.service';
/// <reference path="../../typings/globals/underscore/index.d.ts" />
import * as _ from 'underscore'

const ERRORLIST:any = [
  {"error_desc": "A server error occurred.", "error_code": 99},
  {"error_desc": "Requested theatre does not exist.", "error_code": 101},
  {"error_desc": "Key Error Occurred", "error_code": 102},
  {"error_desc": "Value  Error Occurred. Please provide Value.", "error_code": 103},
  {"error_desc": "Oops, Something went wrong.", "error_code": 113},
  {"error_desc": "Requested seats are not available.", "error_code": 144},
  {"error_desc": "Screen Does not exists.", "error_code": 151},
  {"error_desc": "Requested movie does not exist.", "error_code": 201},
  {"error_desc":"Unable to log in with provided credentials.","error_code":1405},
  {"error_desc":"Phone number is not valid.","error_code":1413},
  {"error_desc":"A user is already registered with this e-mail address.","error_code":1404},
  {"error_desc": "A user is already registered with this phone number.","error_code": 1409},
  {"error_desc":"Mobile verification failed.","error_code":1411},
  {"error_desc":"A user does not exist.","error_code":1406},
  {"error_desc": "Key Error Occurred", "error_code": 202},
  {"error_desc": "Value  Error Occurred. Please provide Value", "error_code": 203},
  {"error_desc": "Requested show does not exist.", "error_code": 301},
  {"error_desc": "Key error occurred. The correct key is 'show_id'.", "error_code": 307},
  {"error_desc": "Key Error Occurred", "error_code": 302},
  {"error_desc": "Value  Error Occurred. Please provide Value", "error_code": 303},
  {"error_desc": "Requested city does not exist.", "error_code": 401},
  {"error_desc": "Key error occurred. The correct key is 'city'.", "error_code": 402},
  {"error_desc": "No active movies for this city. Try changing the city or check the spelling.", "error_code": 404},
  {"error_desc": "Please select city", "error_code": 403},
  {"error_desc": "Your booking request is timed out.", "error_code": 501},
  {"error_desc": "Key error occurred. The correct key is 'show_id'.", "error_code": 502},
  {"error_desc": "Key error occurred. The correct key is 'show_id'.", "error_code": 602},
  {"error_desc": "Key error occurred. The correct keys are 'tid', area_id','area_code', 'seats[{'row_id':x, 'seat_id':x}]'.",
    "error_code": 702},
  {"error_desc": "Seats could not be locked.", "error_code": 703},
  {"error_code": 711, "error_desc": "No show available in this city."},
  {"error_desc": "Key error occurred. The correct keys are 'tid',customer_name', 'customer_phone', 'pickup_name'.", "error_code": 802},
  {"error_desc": "Key error occurred. The correct keys are 'tid', ", "error_code": 902},
  {"error_desc": "Order Not Found ", "error_code": 854},
  {"error_desc": "Could not initiate a booking.", "error_code": 133},

/************************** coupon related erorrs *******************************/

  {"error_desc": "Requested coupon does not exist.", "error_code": 1304},
  {"error_desc": "This offer is expired", "error_code": 1303}
];

@Injectable()
export class ErrorHandlingService {
  public errorList:Array<any>;
  public lastModalResult:string;
  public errorObj:Object;

  constructor(private _router:Router) {
    this.getErorrList();

  }



  public getErorrList() {
    Promise.resolve(ERRORLIST).then(result => this.errorList = result);
  }

  public call(errorCode):Promise<any> {

    /******** to check the minimum amount error  only for error code  = 907 ****/
    if(typeof errorCode == "object" ){
      this.errorObj = errorCode;
    }
    /**************************************************************************/
    else {
      this.errorObj = this.errorList.reduce((errorObj, value) => {
        if (value['error_code'] == errorCode) {
          errorObj = value;
        }
        return errorObj;
      }, {});

      if (_.isEmpty(this.errorObj) || this.errorObj ==null || this.errorObj == undefined) {
        this.errorObj = {
          "error_code": -1, "error_desc": "Oops, Something went wrong."
        }
      }
    }

    return Promise.resolve(this.errorObj);
  }

  public  openDialog(errorObj:{}) {
    // alert( errorObj['error_desc']);

    // let dialog:Promise<ModalDialogInstance>,
    //   component = OKOnlyModal,
    //   content = new OKOnlyContent("titlt", errorObj['error_desc'], "OK", false, false);
    //
    //
    // let bindings = Injector.resolve([
    //   provide(ICustomModal, {useValue: content})
    // ]);
    //
    //
    // dialog = this.modal.open(
    //   <any>component,
    //   bindings,
    //   new ModalConfig("sm", false, 27));
    //
    //
    // dialog.then((resultPromise) => {
    //   return resultPromise.result.then(
    //     (result) => {
    //       this.lastModalResult = result;
    //
    //       switch (errorObj['error_code']) {
    //         case "01":
    //           this._router.parent.lastNavigationAttempt;
    //           break;
    //         case "02":
    //           this._router.parent.lastNavigationAttempt;
    //           break;
    //         case "03":
    //           this._router.navigate(['/']);
    //           break;
    //         default:
    //           //document.location.reload();
    //           this._router.parent.lastNavigationAttempt;
    //
    //       }
    //
    //
    //     },
    //     () => this.lastModalResult = 'Rejected!');
    // });
  }

}
