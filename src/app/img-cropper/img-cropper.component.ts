import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {SupporterDataService} from "../services/service.supporter-data";
import {isUndefined} from "util";
import {FileUploader} from "ng2-file-upload/index";
import {URLS, URL} from "../common/url-constant";
import {AuthService} from "../services/service.auth";
import {EmitterService} from "../services/service.emitter";

declare var iziToast:any;

@Component({
  selector: 'app-img-cropper',
  templateUrl: './img-cropper.component.html',
  styleUrls: ['./img-cropper.component.css']
})
export class ImgCropperComponent implements OnInit {
  public _image:FileUploader = new FileUploader({url: URLS.SupporterDetail});
  @Output() updatedData= new EventEmitter()
  @Input() userdata;
  @Input() role;
  public iserror:boolean=false;
  public errormsg:string;
  constructor(private supporterservice:SupporterDataService,private authservice:AuthService) { }

  ngOnInit() {
  }




  updateImage() {

    let k
    if (!isUndefined(this._image.queue)) {
      k = this._image.queue[0];
      if(this.userdata.role=='supporter'){
        let user = this.authservice.getUser()
      this.supporterservice.putImage(URLS.SupporterDetail + this.userdata.id + "/", this.userdata, k).subscribe(success=> {
        if(user.id==this.userdata.id){
          // for(let k in success.image){
          //   success.image[k]=success.image[k].substring(success.image[k].indexOf(URL)+URL.length,success.image[k].length)
          // }
          user.image=success.image;
          localStorage.setItem('loggedInUser',JSON.stringify(user))
          EmitterService.get("ImageUpdate").emit(user)
        }
        iziToast.success({
          title: 'Uploaded',
          message: 'Your Image has Been Uploaded successfully'

      });

        this.updatedData.emit(success);
        $(".close").click();
      }, error=> {
        console.log(error)
        this.iserror=true;

      })
    }
    else{
        this.supporterservice.putImage(URLS.AddConsultant + this.userdata.id + "/", this.userdata, k).subscribe(success=> {
          this.updatedData.emit(success);
          $(".close").click();
        }, error=> {
          console.log(error)
          this.iserror=true;

        })
      }
    }
  }
    uploadfile(){
      this._image.clearQueue()
    }
    readUrl(input){
      console.log("input",input)
      if (input.target.files && input.target.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e:any) {
          console.log(e)
          $('#blah').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.target.files[0]);
      }

    }

}
