/**
 * Created by consultadd on 23/11/16.
 */
import {PreloadingStrategy, Route} from "@angular/router";
import {Observable} from 'rxjs';

export class CustomPreloadingStrategy implements PreloadingStrategy {

  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    if (route.data['preload']) {
      return Observable.of(true).delay(2000).flatMap(_ => fn());

    }
    else {
      return Observable.of(null);
    }
  }

}
