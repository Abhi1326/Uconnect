import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {EmitterService} from "../services/service.emitter";
import {RestService} from "../services/service.rest";
import {URLS} from "../common/url-constant";
import * as _ from "underscore";
import {TodoListDataService} from "../services/service.widgets";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  encapsulation:ViewEncapsulation.Emulated
})
export class TodoListComponent implements OnInit  {
  public to:boolean =true
  public user:any
  public dashboard:any
  public to1:boolean=true
  public item:string
  public items:Object[]=[]
  constructor(private restservice:RestService,private todoservice:TodoListDataService) { }

  ngOnInit() {
    this.user=JSON.parse(localStorage.getItem('loggedInUser'))
    if(this.user) {
      this.dashboard = JSON.parse(localStorage.getItem("dashboard"))
      let temp = _.pick(this.dashboard, 'to_do_list')
      this.items =temp["to_do_list"]
      console.log("items===========>",this.items);
    }
    EmitterService.get('widget').subscribe(data2=>{
      this.close(data2)
    })
  }
  minimize(view)
  {

    if(view == 'todolist')
    {
      this.to = !this.to;
    }
  }
 close(view1)
  {

    if(view1 == 'todolist')
    {
      this.to1 = !this.to1;
    }
  }
 additem(){
   this.todoservice.addList(this.item,this.user.id).subscribe(response=>{
     if(response){
       let obj
         obj ={
         id:response.id,
         text:response.text,
         user:response.user,
         username:response.username
       }
       this.items.push(obj);

     }
   })

 }
 removeitem(id){
   // this.items.splice(index,1);
   // this.items = _.filter(this.items,list=>{
   //   return list.id !=id
   // })
   this.todoservice.removeList(id).subscribe(response=>{
     if(response){
       this.items=response;
       // console.log(response,"======r===e==s==ponse")
     }
   })

 }
}
