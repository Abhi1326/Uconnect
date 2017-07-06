import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {SupporterDataService} from "../services/service.supporter-data";
import {isUndefined} from "util";
import {FileUploader} from "ng2-file-upload/index";
import {URLS, URL} from "../common/url-constant";
import {AuthService} from "../services/service.auth";
import {EmitterService} from "../services/service.emitter";
import {ProjectDataService} from "../services/service.project-data";

declare var iziToast:any;
@Component({
  selector: 'app-fileuploader',
  templateUrl: './fileuploader.component.html',
  styleUrls: ['./fileuploader.component.css']
})
export class FileuploaderComponent implements OnInit {

  public _file:FileUploader = new FileUploader({url: URLS.SupporterDetail});
  @Output() updatedData= new EventEmitter()
  @Input() projectdata;
  @Input() role;
  public iserror:boolean=false;
  public errormsg:string;


  constructor(private authservice:AuthService,private pds:ProjectDataService) { }

  ngOnInit() {
    console.log(this.projectdata,"inside file")
  }
  uploadfile(){
    this._file.clearQueue()
  }
  uploadFile(){
    let k
    if (!isUndefined(this._file.queue)) {
      k = this._file.queue[0];
        this.pds.uploadFile( this.projectdata, k).subscribe(success=> {
          this.updatedData.emit(success)

          iziToast.success({
            title: 'Uploaded',
            message: 'Your File has Been Uploaded successfully'

          });
          $(".close").click();
        }, error=> {
          console.log(error)
          this.iserror=true;

        })
      }
  }
}
