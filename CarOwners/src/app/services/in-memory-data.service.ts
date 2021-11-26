import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { CarOwner } from '../types';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
      const carOwners = [
        {id: 11, aLastName: 'Иванов', aFirstName: 'Иван', aMiddleName: 'Иванович', aCars: [
          {id: 11, number: 'AX2544RB', brand: 'KIA', model: 'Optima', year: 2018}
        ]},
        {id: 12, aLastName: 'Петрова', aFirstName: 'Наталия', aMiddleName: 'Игоревна', aCars: [
          {id: 12, number: 'AX2121HP', brand: 'Hyundai', model: 'Accent', year: 2009},
          {id: 12, number: 'BC7286AE', brand: 'KIA', model: 'Optima', year: 2019}
        ]},
        {id: 13, aLastName: 'Антонов', aFirstName: 'Алексей', aMiddleName: 'Сергеевич', aCars: [
          {id: 13, number: 'RF4556TY', brand: 'Honda', model: 'Civic', year: 2011}
        ]},
      ];
      return {carOwners};
  }

  genId(carOwners: CarOwner[]): number {
    return carOwners.length > 0 ? Math.max(...carOwners.map(carOwners => carOwners.id)) + 1 : 11;
  }
}
