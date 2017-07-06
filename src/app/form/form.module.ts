import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormComponent} from "./form.component";
import {Routes, RouterModule} from "@angular/router";
import {AddConsultantComponent} from "../add-consultant/add-consultant.component";
import {AddEngineerComponent} from "../add-engineer/add-engineer.component";
import {AddProjectComponent} from "../add-project/add-project.component";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {AllSupporterResolve, AllConsultantResolve} from "../services/service.dataresolver";
import {SharedModule} from "../common/sharedModule";
import {Ng2DatetimePickerModule} from "ng2-datetime-picker/dist/index";

const routeConfig:Routes=[
  {
    path: '',component:FormComponent,
    resolve: {
      allsupporter: AllSupporterResolve,
      allconsultant: AllConsultantResolve,
    }
  },
]
@NgModule({
  imports: [
    CommonModule,ReactiveFormsModule,FormsModule,RouterModule.forChild(routeConfig),SharedModule,Ng2DatetimePickerModule
  ],
  declarations: [AddConsultantComponent,AddEngineerComponent,AddProjectComponent,FormComponent],
  providers:[AllSupporterResolve]
})
export class FormModule { }
