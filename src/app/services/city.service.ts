import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CityService {
  private _citySource = new Subject<any>();
  city$ = this._citySource.asObservable();
  private cities: Map<string, number> = new Map();

  constructor() { }

  addCity (city: string): void {
    let tempCity = this.cities.get(city.toLowerCase());
    if (tempCity) {
      tempCity++;
      this.cities.set(city.toLowerCase(), tempCity);
    } else {
      this.cities.set(city.toLowerCase(), 1);
    }
    this._citySource.next(this.cities);
  }
}





