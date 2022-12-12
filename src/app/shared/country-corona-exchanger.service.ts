import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CountryCoronaExchangerService {
  update = new EventEmitter<any>();

  constructor() {}

  publishUpdate(corona: any) {
    this.update.emit(corona);
  }

}
