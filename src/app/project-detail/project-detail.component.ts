import {Component, OnInit, ViewEncapsulation, AfterContentInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {ProjectDataService} from "../services/service.project-data";
import {FileUploader} from "ng2-file-upload/index";
import {URLS} from "../common/url-constant";
import {environment} from "../../environments/environment";
import {ConsultantDataService} from "../services/service.consultant-data";
import {EmitterService} from "../services/service.emitter";
import {SupporterDataService} from "../services/service.supporter-data";
declare var iziToast:any

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
  encapsulation:ViewEncapsulation.Emulated,
})
export class ProjectDetailComponent implements OnInit,AfterContentInit,OnDestroy {
  public projectdata:any;
  public consultantdata:any;
  public supporterprojectdata:any;
  public commentForm:FormGroup;
  public user :any;
  public img :any;
  public interval:any
  public status:any
  public consultant_status:any
  public host=environment.apiUrl
  socket=null;
  public isSuper_pdetail
  constructor(private activatedroute:ActivatedRoute,private formbuilder:FormBuilder, private sds:SupporterDataService,
              private projectservice:ProjectDataService,private route:Router,private cds:ConsultantDataService) {

  }
  ngOnDestroy(){
    clearInterval(this.interval);
  }
  ngOnInit() {
    this.isSuper_pdetail = this.sds.get_isSuperuser()
    this.user =JSON.parse(localStorage.getItem("loggedInUser"))
    this.commentForm=this.formbuilder.group({
      comment: new FormControl("",[Validators.required])
    })
    $("#message").keypress(function (e) {
      if(e.which == 13 && !e.shiftKey) {
          document.getElementById('post_comment').click();
      }
    });

  }
  ngAfterContentInit(){

    this.projectdata = this.activatedroute.snapshot.data['projectdata'];
    this.consultantdata = this.projectdata.consultant;
    this.checkSatus()
    this.supporterprojectdata = this.projectdata.supporter;
    this.interval=setInterval(data=>{
        this.projectservice.getproject(this.projectdata.id).subscribe(result=> {
          if(this.projectdata.comment.length!=result.comment.length){
           let count = result.comment.length - this.projectdata.comment.length;
            for(let k =0;k<count;k++){
              iziToast.show({
                title:result.comment[k]._supporter.username,
                message:result.comment[k].text,
                image:result.comment[k]._supporter.image,
              })
            }
          }
          this.projectdata = result;

        })
    },100000000)

  }

 addComment(value){
   let obj= {
     text:value.comment,
     project:this.projectdata.id,
     supporter:this.user.id
   }

   EmitterService.get("msd").emit(JSON.stringify(obj))
  this.projectservice.addComment(JSON.stringify(obj)).subscribe(response=>{
    this.projectdata.comment.unshift(response);
    // console.log(this.projectdata.comment);
    (<HTMLInputElement>document.getElementById("message")).value = ""
  })
 }

  open_profile_supp(id){
    this.route.navigate(["profile/supporter",id])
  }
  updateStatus(){
  this.projectservice.update(this.status,this.projectdata).subscribe(data=>{
    console.log(data,this.projectdata.id,this.status)
  })
  }

  addFiles(){
    // console.log('asdasdasdasd')
    $('#editfile').modal('show')
  }

  updatedData(data){
    this.projectdata.file.push(data)
    console.log(   this.projectdata.file,"-====>")
  }
  changeStatus(){
    $("#statusModal").modal("show")
  }
  updateConsultantStatus(id){
    let obj={
      username:this.consultantdata.username,
      status:this.consultant_status
    }
    this.cds.updateStatus(obj,id).subscribe(result=>{
      this.consultantdata.status=this.consultant_status
      this.checkSatus()
    })
    // console.log("asdasd")
  }
  checkSatus(){
    var el=document.getElementById("status")

    if(this.consultantdata.status=="active"){
      el.className ="btn-danger"
    }
    else{
      if(this.consultantdata.status=="less_active"){
        el.className ="btn-warning"

      }
      else{

        el.className ="btn-dark"
      }
    }
  }
  chngProject(){
    $("#projectModal").modal("show")
  }

  checkPermission(){
    if(this.isSuper_pdetail){
      return false
    }
    else{
      if(this.user.id==this.supporterprojectdata.id){
        console.log("sd")
        return false
      }
      else{
        return true
      }
    }
  }

}
