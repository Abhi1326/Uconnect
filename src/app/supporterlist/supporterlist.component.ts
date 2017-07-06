import {Component, OnInit, AfterContentInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {RestService} from "../services/service.rest";
import {URLS} from "../common/url-constant";
import {EmitterService} from "../services/service.emitter";
import {SupporterDataService} from "../services/service.supporter-data";

@Component({
  selector: 'app-supporterlist',
  templateUrl: './supporterlist.component.html',
  styleUrls: ['./supporterlist.component.css'],
  encapsulation:ViewEncapsulation.Emulated,

})
export class SupporterlistComponent implements OnInit ,AfterContentInit {
  public supporterdata:any;
  public consultantdata:any;
  public empid:boolean = false;
  public search_supporter:any;
  public isSuperuser_slist:any;
  public nosupp:boolean = false;

  constructor(private activatedroute:ActivatedRoute, private route:Router, private restservice:RestService, private sds:SupporterDataService) {
  }

  ngOnInit() {
    this.isSuperuser_slist = this.sds.get_isSuperuser()
  }

  ngAfterContentInit() {

    if (window.location.hash == '#/supporterlist') {
      this.supporterdata = this.activatedroute.snapshot.data['allsupporter'];
      this.empid = true;
      if (this.supporterdata.length == 0 || this.supporterdata == '') {

        this.nosupp = true;
      } else {
        this.nosupp = false
      }
    }
    if (window.location.hash == '#/consultantlist') {
      this.supporterdata = this.activatedroute.snapshot.data['allconsultant'];
      this.empid = false;
      if (this.supporterdata.length == 0 || this.supporterdata == '') {

        this.nosupp = true;
      } else {
        this.nosupp = false
      }
    }

  }

  open_user_profile(pass) {

    if (window.location.hash == '#/supporterlist') {
      this.route.navigate(["/profile/supporter", pass]);
    }
    else {
      console.log("consultant profile", pass);
      this.route.navigate(["/profile/consultant", pass]);
    }

  }

  finding_supporter() {
    if (window.location.hash == '#/supporterlist') {
      this.restservice.get(URLS.SupporterSearch + this.search_supporter).subscribe(
        data=> {
          this.supporterdata = data;
          if (this.supporterdata.length == 0 || this.supporterdata == '') {
            this.nosupp = true;
          } else {
            this.nosupp = false
          }
        }
      );
    }
    else {
      if (window.location.hash == '#/consultantlist') {
        this.restservice.get(URLS.ConsultantSearch + this.search_supporter).subscribe(
          data=> {
            this.supporterdata = data;
            console.log("supporterdata", this.supporterdata);
            if (this.supporterdata.length == 0 || this.supporterdata == '') {

              this.nosupp = true;
            } else {
              this.nosupp = false
            }

          }
        );
      }
    }

  }

  delete_profile(val) {
    if (window.location.hash == '#/supporterlist') {
      this.restservice.get(URLS.Admin + val + "/delete_user/").subscribe(
        data=> {
          this.supporterdata = data;
        }
      );
    }
    else {
      if (window.location.hash == '#/consultantlist') {
        this.restservice.get(URLS.Admin + val + "/delete_user/").subscribe(
          data=> {
            this.supporterdata = data;
          }
        )
      }
    }
  }

  addUser() {
    if (window.location.hash == '#/supporterlist') {
          this.route.navigate(['form','supporter'])

    }
    else {
      if (window.location.hash == '#/consultantlist') {
        this.route.navigate(['form','consultant'])
      }

    }

  }



}
