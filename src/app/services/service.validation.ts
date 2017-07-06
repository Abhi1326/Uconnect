/**
 * Created by consultadd on 18/11/16.
 */
import{FormGroup} from '@angular/forms';

export const VALIDATORS = {
  PASSWORD : "^[a-zA-Z0-9!@#$%^&*]{6,100}$",
  EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PHONE: "^[0-9]{10}$",
  ALPHABETS_ONLY: "^[a-zA-Z]+$",
  ALPHABETS_SPACES: /^[a-zA-Z ]+$/,
  EMAIL_PHONE:/^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|(^[0-9]{10}$)$/,
  WALLET_AMOUNT:/([1-9]\d\d|[1-9]\d{3,})/g

}

export class ValidationService{
  static getValidatorErrorMessage(code:string){
    let config = {
      required:"Required field, can't be empty.",
      invalidPassword:'At least 6 characters in length.',
      invalidEmailAddress: '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>' +' Please enter a valid email address.',
      invalidNumber: '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>' + ' Please enter 10 digit mobile number',
      mismatchedPasswords : 'Passwords do not match.',
      invalidText: 'Only alphabets are allowed. Spaces not allowed',
      checkedOptional:'Enter at least one field',
      invalidTextSpace: '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>' +' Alphabets and spaces only',
      invalidEmailPhone: 'Wrong email or phone format',
      invalidEmailidMessage: '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>' +' Please enter a valid email',
      invalidWalletAmount : "Amount to be added must be more than 100.",
      invalidFloatValue:"Please enter integer value."
    };
    return config[code];
  }
  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if ( control.value.match( VALIDATORS.PASSWORD )) {
      return null;
    } else {
      return {invalidPassword: true };
    }
  }
  static checkingOptional(emailKey: string, phonenoKey: any) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[emailKey];
      let confirmPassword = group.controls[phonenoKey];

      if (!(password.value ||confirmPassword.value)) {
        return {checkedOptional: true};
      }
    }
  }
  static matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {mismatchedPasswords: true};
      }
    }
  }



  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(VALIDATORS.EMAIL)) {
      return null;
    } else {
      return {invalidEmailAddress: true };
    }
  }


  static emailEmptyOrValidValidator(control) {
    if (control._value == "" || control._value == null){

      return null;

    }else{

      if (control.value.match(VALIDATORS.EMAIL)) {
        return null;
      } else {
        return {invalidEmailidMessage: true };
      }
    }

  }

  static emailReturn(){
    return {invalidEmailAddress: true };
  }

  static phoneValidator(control) :any{
    if(control.value.match(VALIDATORS.PHONE)){
      return null;
    }else{
      return {invalidNumber: true};
    }
  }

  static textOnlyValidator(control) :any{

    if (control.value.match(VALIDATORS.ALPHABETS_ONLY)){
      return null;
    }else{
      return {invalidText: true};
    }

  }


  static textAndSpaceValidator(control) :any{

    if (control.value.match(VALIDATORS.ALPHABETS_SPACES)){
      return null;
    }else{
      return {invalidTextSpace: true};
    }
  }

  static emailPhoneValidator(control):any{
    if(control.value.match(VALIDATORS.EMAIL_PHONE)){
      return null;
    }else{
      return {invalidEmailPhone: true}
    }
  }

}
