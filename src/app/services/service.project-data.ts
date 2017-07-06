/**
 * Created by consultadd on 1/12/16.
 */


import {Injectable} from "@angular/core";
import {RestService} from "./service.rest";
import {URLS} from "../common/url-constant";
import {contentHeaders} from "../common/headers";

@Injectable()
export class ProjectDataService {

  constructor(private restservice:RestService){

  }
  getproject(id){
    return this.restservice.get(URLS.ProjectDetail+id+"/get_comments/")

  }
  getadmindata(){
    return this.restservice.get(URLS.Admin)
  }

  addproject(url,data)
  {
    let obj;
    obj= {
      title:data.title,
      description:data.description,
      technology:data.technology,
      consultant:data.consultant,
      assigned_date:data.assigned_date,
      join_date:data.join_date,
      supporter:data.supporter,
      shadow_supporter:data.shadow_supporter,
      status:data.status
    };
    console.log(obj);
    obj=JSON.stringify(obj);
    return this.restservice.post(url,obj)
  }

  getallprojectdata(){
    return this.restservice.get(URLS.ProjectDetail)
  }

  addComment(data){
    return this.restservice.post(URLS.COMMENTS,data)
  }

  delete(id){
    return this.restservice.get(URLS.Admin+id+"/delete_project/")
  }
  search(value){
    return this.restservice.get(URLS.SearchProject+value)
  }
  update(status,data){
    let obj ={
      status:status,
      consultant:data.consultant.id,
      title:data.title
    }
    return this.restservice.put(URLS.AddProject+data.id+"/",JSON.stringify(obj))
  }

  uploadFile(project,file){
    let obj=new FormData()
    obj.append('file',file._file,file.file.name)
    obj.append('project',project.id)
    contentHeaders.delete('Content-Type');

    return this.restservice.post(URLS.FILEUPLOAD,obj)
  }


  getProjectHistory(id){
    return this.restservice.get(URLS.ProjectHistory+id+"/")

  }
}



