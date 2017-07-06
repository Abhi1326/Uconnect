
import { Headers } from '@angular/http';
// localStorage.setItem('city','{"id":24,"name":"mumbai"}');

export const contentHeaders = new Headers();

contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');

// Header configurations for Citrus Wallet Service ...
export const walletHeaders = new Headers();

let CW_SIGN_UP_TOKEN = JSON.parse(localStorage.getItem('CW_SIGN_UP_TOKEN'));

if ( CW_SIGN_UP_TOKEN ){
  walletHeaders.append('Content-Type', 'application/json');

}
