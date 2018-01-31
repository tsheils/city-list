import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {CityService} from '../app/services/city.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cityCtrl = new FormControl();
  cities: any[] = [];
  constructor(private cityService: CityService) {}

  ngOnInit() {
    this.cityService.city$.subscribe(cities => {
      this.cities = [];
 /*     [...cities.values()].forEach(drugs => {
        console.log(drugs);
      });*/
      for (const key of Array.from(cities.keys())) {
        const capKey: string = this.capitalize(key);
        this.cities.push({city: capKey, count: cities.get(key)});
      }
      // one liner to replace previous function
      this.cities.sort((a, b) => b.count - a.count);
      /*this.cities.sort((a, b) => {
        if (a.count > b.count) {
          return -1;
        } else if (a.count < b.count) {
          return 1;
        } else {
          return 0;
        }
      });*/
    });
    }

    submit(): void {
    // todo -- make sure this can't be empty
    this.cityService.addCity(this.cityCtrl.value);
    this.cityCtrl.reset();
    }

    capitalize (city: any): string {
    let capitalize: string;
    capitalize = city.charAt(0).toUpperCase().concat(city.slice(1, city.length));
    return capitalize;
    }
}
