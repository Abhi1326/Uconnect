import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";
import {hostname} from "os";
import {URL} from "../../common/url-constant";

@Component({
  selector: 'app-project-list-tile',
  templateUrl: './project-list-tile.component.html',
  styleUrls: ['./project-list-tile.component.css']
})
export class ProjectListTileComponent implements OnInit {
  @Input() active_project:any
  public host=URL
  constructor(private route:Router) { }

  ngOnInit() {
  }


  open_detail_project(projectid)
  {
    this.route.navigate(['detail',projectid]);
  }

  open_cprofile(id){
    this.route.navigate((['profile/consultant',id]))
  }

  open_sprofile(id){
    this.route.navigate((['profile/supporter',id]))

  }


}
