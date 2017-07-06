import {Injectable} from "@angular/core";
import {RestService} from "./service.rest";
import * as _ from  "underscore"
import {URLS} from "../common/url-constant";

@Injectable()
export class ConsultantDataService {

  constructor(private restservice:RestService){

  }
  getconsultant(id){
    return this.restservice.get(URLS.ConsultantDetail+id+"/")

  }
  getadmindata(){
    return this.restservice.get(URLS.Admin)
  }

  addconsultant(url,data){
    let obj;
    obj= {
      username:data.consultant_username,
      first_name:data.consultant_firstname,
      last_name:data.consultant_lastname,
      email:data.consultant_email,
      gender:data.consultant_gender,
      mobile_no:data.consultant_mobile,
      skype_username:data.consultant_skypeid,
      role:data.consultant_role,
      supporter:data.consultant_sid,
      experience:data.consultant_experience,
      client_name:data.consultant_client,
      assigned_date:data.assigned_date
    }
    obj=JSON.stringify(obj)
    return this.restservice.post(url,obj)
  }


  getallconsultantdata(){
    return this.restservice.get(URLS.ConsultantDetail)
  }
  updateStatus(obj,id){

    return this.restservice.put(URLS.AddConsultant+id+"/",JSON.stringify(obj))
  }
}



