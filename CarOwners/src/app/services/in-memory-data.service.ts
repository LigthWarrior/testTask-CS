import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb(): {} {
    return {
      carOwners: [
        {aLastName: 'Иванов', aFirstName: 'Иван', aMiddleName: 'Иванович', aCars: 1},
        {aLastName: 'Петрова', aFirstName: 'Наталия', aMiddleName: 'Игоревна', aCars: 2},
        {aLastName: 'Антонов', aFirstName: 'Алексей', aMiddleName: 'Сергеевич', aCars: 2},
      ]
    };
  }
}
