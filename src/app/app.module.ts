import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {routing, appRoutingProviders} from "./app.routes";
import {AuthService} from "./services/service.auth";
import {RestService} from "./services/service.rest";
import { EngineersProfileComponent } from './engineers-profile/engineers-profile.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import {ConsultantDataService} from "./services/service.consultant-data";
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {SupporterlistComponent} from "./supporterlist/supporterlist.component";
import {ProjectlistComponent} from "./projectlist/projectlist.component";
import {ProjectDataService} from "./services/service.project-data";
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import {MomentModule} from "angular2-moment/index";
import {NotificationsComponent} from "./notifications/notifications.component";
import {NotificationDataService} from "./services/service.widgets";
import {TimeAgoPipe} from "time-ago-pipe/time-ago-pipe";
import { FileSelectDirective} from "ng2-file-upload/index";
import {SharedModule} from "./common/sharedModule";
import { ImgCropperComponent } from './img-cropper/img-cropper.component';
import { CamelCasePipe } from './camel-case.pipe';
import {Ng2DatetimePickerModule} from "ng2-datetime-picker/dist/index";
import { FileuploaderComponent } from './fileuploader/fileuploader.component';
import { HistorylogComponent } from './historylog/historylog.component';
import { StatisticalChartComponent } from './statistical-chart/statistical-chart.component';
import {ChartsModule} from "ng2-charts/ng2-charts";
import { KeyPipe } from './key.pipe';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EngineersProfileComponent,
    ProjectDetailComponent,
    ResetPasswordComponent,
    SupporterlistComponent,
    ProjectlistComponent,
    ProfileModalComponent,
    NotificationsComponent,
    TimeAgoPipe,
    FileSelectDirective,
    ImgCropperComponent,
    CamelCasePipe,
    FileuploaderComponent,
    HistorylogComponent,
    StatisticalChartComponent,
    KeyPipe,





  ],
  imports: [
    BrowserModule,
    HttpModule,
    MaterialModule.forRoot(),
    routing,
    MomentModule,
    SharedModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    Ng2DatetimePickerModule,
    ChartsModule

  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},AuthService,RestService,
    appRoutingProviders, ConsultantDataService,ProjectDataService,NotificationDataService
    ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
