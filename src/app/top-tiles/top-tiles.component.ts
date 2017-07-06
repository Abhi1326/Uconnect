import {Component, OnInit, Input} from '@angular/core';
import {SupporterDataService} from "../services/service.supporter-data";
import {Router} from "@angular/router";
import {EmitterService} from "../services/service.emitter";

@Component({
  selector: 'app-top-tiles',
  templateUrl: './top-tiles.component.html',
  styleUrls: ['./top-tiles.component.css']
})
export class TopTilesComponent implements OnInit {
  @Input() alldata:any
  public isSuperuser_admin:boolean;
  constructor(private sds:SupporterDataService,private route:Router) { }

  ngOnInit() {


    EmitterService.get('showlist').subscribe(data=> {
      this.formlist(data)
    });

    EmitterService.get('addup').subscribe(data1=> {
      this.form(data1)
    });

    this.isSuperuser_admin = this.sds.get_isSuperuser()
  }


  form(value) {

    this.route.navigate(['form', value])

  }

  formlist(value){
    if(value == 'projectlist')
    {
      this.route.navigate(['projectlist'])
    }
    if(value == 'consultantlist')
    {
      console.log(value, "list");
      this.route.navigate(['consultantlist'])
    }
    if (value == 'supporterlist')
    {
      console.log(value);
      this.route.navigate(['supporterlist'])
    }
  }

}
