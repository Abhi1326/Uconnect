import {Component, Input} from '@angular/core';
import {ValidationService} from '../services/service.validation';
import {controlmessagesCssTemplate } from "./controlmessages.component.css";
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-controlmessages',
  template: `
  <span class="cd-response-error" *ngIf="errorMessage !== null" [innerHTML]=errorMessage></span>
  `,
  styles: [controlmessagesCssTemplate],
})
export class ControlmessagesComponent {
  // controlName:string;
 @Input() control:FormControl;
  constructor() {


  }

  get errorMessage() {
    // let c = this._formDir.form.find(this.controlName);

    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName);
      }
    }

    return null;
  }
}
