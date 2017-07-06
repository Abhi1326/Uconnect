import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";
import {URL} from "../../common/url-constant";

@Component({
  selector: 'app-engineers-list-tile',
  templateUrl: './engineers-list-tile.component.html',
  styleUrls: ['./engineers-list-tile.component.css']
})
export class EngineersListTileComponent implements OnInit {

  @Input() eng_list:any
  public host=URL
  constructor(private route:Router) { }

  ngOnInit() {
  }

  open_sprofile(id){
    this.route.navigate((['profile/supporter',id]))

  }

}
