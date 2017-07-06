import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore'
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-engineer-dashboard',
  templateUrl: './engineer-dashboard.component.html',
  styleUrls: ['./engineer-dashboard.component.css']
})
export class EngineerDashboardComponent implements OnInit {
  public alldata:any
  constructor(private activatedroute:ActivatedRoute) { }

  ngOnInit() {

  }


  ngAfterContentInit() {
    this.alldata = this.activatedroute.snapshot.data['AllData']
    localStorage.setItem('dashboard',JSON.stringify(this.alldata))

  }
}
