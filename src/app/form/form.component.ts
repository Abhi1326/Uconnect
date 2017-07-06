import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/service.auth";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
public type:any
  constructor(private activatedroute:ActivatedRoute,private authservice:AuthService,private route:Router) {
  }

  ngOnInit() {
      this.activatedroute.params.subscribe(params => {
      this.type = params['type']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });

  }
  checkAdmin(){
    if(this.type=='consultant'||this.type=='supporter'){
     var temp= this.authservice.isadmin()
      if(temp){
       return temp
      }
      else{
        this.authservice.logout()

        return false
      }

    }
  }
}
