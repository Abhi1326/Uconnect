import {
  Component, OnInit, ViewEncapsulation, AfterContentInit,
} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import * as _ from 'underscore'
import {URL} from "../common/url-constant";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  encapsulation:ViewEncapsulation.Emulated,
})
export class AdminDashboardComponent implements OnInit,AfterContentInit {
  public alldata:any;
  public active_project:any
  public eng_list
  public host:string=URL;




  constructor(private route:Router, private activatedroute:ActivatedRoute) {

  }

  ngOnInit() {


  }


  ngAfterContentInit() {
    this.alldata = this.activatedroute.snapshot.data['AllData']
    localStorage.setItem('dashboard',JSON.stringify(this.alldata))
    this.active_project=_.pick(this.alldata,'active_projects')
    this.eng_list=_.pick(this.alldata,'project_wise_supporter')
    console.log(this.active_project,this.eng_list)

  }





}
