
 import { environment } from '../../environments/environment';
export const HOME = window.location.origin;

 export const URL:string = environment.apiUrl


// let params = new URLSearchParams();
// params.set('city',localStorage.getItem('city') );
let BASEURL = URL + "/all_auth/"
let NEWBASEURL = URL + "/api/v2/"
//
// //Citrus Sandbox's URLS - Wallet Service Integration Testing
// let CW_BASE_URL = "https://sandboxadmin.citruspay.com";
// let CW_API_ENDPOINT = "/service/um/find_or_create/user/";
//
// MSG91 OTP SERVICE PROVIDER URL
 let OTP_BASE_URL = 'https://sendotp.msg91.com/api/';

 export const MEDIAURL = URL;
 const AUTHURL = URL + "/api/rest-auth/";
 const AUTH_USER_BASE_URL = URL + '/api/users/';

 export const URLS = {


   LOGIN:URL+"/accounts/login/",
   SIGNUP:URL+"/register/",
   AddConsultant:URL+"/add_consultant/",
   SupporterSearch:URL+"/supporter/?search=",
   SearchProject:URL+"/add_project/?search=",
   ConsultantSearch:URL+"/add_consultant/?search=",
   AddSupporter:URL+"/add_supporter/",
   AddProject:URL+"/add_project/",
   Admin:URL+"/supporter_panel/",
   SupporterDetail:URL+"/supporter/",
   ProjectDetail:URL+"/add_project/",
   ConsultantDetail:URL+"/add_consultant/",
   AUTH_USER_DETAIL:URL+"/log/",
   Password_Reset_Confirm:URL+"/accounts/password/reset/confirm/",
   LOGOUT:URL+"/logout/",
   Password_Reset:URL+"/accounts/password/reset/",
   Notification:URL+"/notification/",    //------------/id/get_notify/
   TodoList:URL+"/to_do_list/",          //------------/id/get_list/
   COMMENTS:URL+"/comment/",
   TECHNOLGY:URL+"/technology/",
   RESUME:URL+"/media/user/",
   Delete_Notification:URL+"/supporter_panel/", //--------/id/delete_notification
   FILEUPLOAD:URL+'/file/',
   ProjectHistory:URL+'/history/', //id of the project shpuld be appended


//   GETMOVIE: BASEURL+"citymovies/movies/",
//   GETMOVIEBYID: BASEURL+"movies/",
//   SIGNUP:AUTHURL+"registration/v2/",
//   GETTHEATRE : NEWBASEURL + "movies/",
//
//   LOGIN: AUTHURL +"v2/login/",
//   AUTH_PROFILE: URL + '/api/users/get_user_object/',
//   USER_UPDATE_PASSWORD: BASEURL + 'users/update_password/',
//   AUTH_USER_DETAIL: URL + '/api/rest-auth/user/',
//     AUTH_USER_LOGOUT: URL + '/api/rest-auth/logout/',
//   PASSWORD_CHANGE: URL + '/api/rest-auth/password/change/',
//   PASSWORD_RESET: URL + '/api/rest-auth/v2/password/reset/',
//
//   PASSWORD_RESET_CONFIRM: URL + '/api/rest-auth/password/reset/confirm/',
//
//   PREFERENCES_GET_ALL: URL + '/api/v1/preferences/',
//   BOOKING_ORDERS_BY_USER: BASEURL + 'order/by_user/',
//
//   // SOCIAL LOGIN URLS
//   FACEBOOK_LOGIN_URL: URL + '/api/rest/rest-auth/facebook/',
//   GOOGLE_LOGIN_URL: URL + '/api/rest/rest-auth/google/',
//
//
//   GETSEATLAYOUT:BASEURL +'order/getseatlayout/',
//   LOCKSEATS: BASEURL + 'order/lockseats/',
//   CANCELTRANSCATION: BASEURL + 'order/cancel_transaction/',
//   ORDER: BASEURL + 'order/',
//   RESEND_TICKET: BASEURL + 'order/by_booking_id/',
//   RESEND_TICKET_BY_NUMBER: BASEURL + 'order/by_user_phone/',
//   LOCKSEATSBYID: '/lockseats_tid/',
//   APPLYCOUPON: '/apply_coupon/',
//   REMOVECOUPON: '/remove_coupon/',
//
//   VALIDATEBOOKING: BASEURL+ 'order/validate_booking/',
//   BOOKING: BASEURL+ 'order/booking/',
//   BOOKING_GET_ORDERS_BY_USER: BASEURL + 'order/booking/by_user/',
//   BOOKINGBYTID : '/booking_tid/',
//
//   GETTHEATRESLUG : BASEURL + 'theatres/get_theatres/',
//   GETMOVIEBYTHEATRE : BASEURL + 'theatres/',
//   // COMMITBOOKING:BASEURL +'order/booking/',
//   // Wallet URLs -----------------------//
//   CW_SIGN_UP_URL: CW_BASE_URL + CW_API_ENDPOINT,
//
//   EMAIL_UPDATE: BASEURL + 'users/update_email/',
//
//   // OTP URLs ------------------------------------------
//   OTP_GENERATE_VERIFY_URL: BASEURL + 'users/generate_verify_otp/',
//   OTP_GENERATE : BASEURL +'users/generate_otp/',
//   PHONE_EXIST: BASEURL + 'users/check_phone_exists/',
//   EMAIL_EXIST: BASEURL + 'users/check_email_exists/',
//   UPDATE_PHONE: BASEURL + 'users/update_phone/',
//   UPDATE_EMAIL: BASEURL + 'users/update_email/',
//
//   REFERRAL_CODE: BASEURL + 'users/check_referral_code/',
//   PLACE_ORDER: BASEURL +'order/bookseats/',
//   FORGETPASSWORDOPT : BASEURL + 'users/verify_otp/',
//
//   GET_WALLET_BALANCE: NEWBASEURL + 'wallet/get_balance/',
//   ADD_WALLET_MONEY: NEWBASEURL + 'wallet/add_money/',
//   PAY_VIA_WALLET: NEWBASEURL + 'wallet/pay_via_wallet/',
//   GET_TRANSACTIONS : NEWBASEURL + 'transaction/get_transactions/',
//   WALLET_CHECK:NEWBASEURL + 'wallet/check_max_limit/',
 };
