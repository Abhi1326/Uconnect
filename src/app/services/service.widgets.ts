
import {Injectable} from "@angular/core";
import {RestService} from "./service.rest";

import {URLS} from "../common/url-constant";

@Injectable()
export class NotificationDataService {

  constructor(private restservice:RestService){

  }
  getNotify(id,page){
    return this.restservice.get(URLS.Notification+ id+"/?page="+page)
  }
  deleteNotify(item){
    return this.restservice.get(URLS.Delete_Notification+item.id+"/delete_notification/")
  }
  sendMail(email){
    console.log("put")
    let obj
    obj={
      email:email
    }
    return this.restservice.post(URLS.Password_Reset,JSON.stringify(obj))
  }
}


@Injectable()
export class TodoListDataService {

  constructor(private restservice:RestService){

  }
  addList(item,id){
    let obj
    obj ={
      text : item,
      user : id

    }
    return this.restservice.post(URLS.TodoList,JSON.stringify(obj))

  }
  removeList(id){
    return this.restservice.get(URLS.Admin+id+"/delete_to_do_list/")
  }



}


