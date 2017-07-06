
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ControlmessagesComponent} from "../controlmessages/controlmessages.component";
import {AllSupporterResolve, AllConsultantResolve} from "../services/service.dataresolver";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";
import {CanActivateViaAuthGuardSupporter} from "../services/service.auth-guard";
import {ChartsModule} from "ng2-charts/ng2-charts";
import {TechChartComponent} from "../tech-chart/tech-chart.component";
import {TopTilesComponent} from "../top-tiles/top-tiles.component";
import {EmitterService} from "../services/service.emitter";
import {SupporterDataService} from "../services/service.supporter-data";
import {TodoListComponent} from "../todo-list/todo-list.component";
import {TodoListDataService} from "../services/service.widgets";


@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,ChartsModule,
  ],
  declarations: [ControlmessagesComponent,TechChartComponent,TopTilesComponent,TodoListComponent],
  exports:[ControlmessagesComponent,TechChartComponent,TopTilesComponent,TodoListComponent],
})
export class SharedModule {
  static forRoot(){
    return {
      ngModule: SharedModule,
      providers: [AllSupporterResolve,AllConsultantResolve,
        CanActivateViaAuthGuardSupporter,EmitterService,
        SupporterDataService,TodoListDataService]
    }
  }
}
