import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarOwner } from '../types';

@Injectable({
  providedIn: 'root'
})
export class CarOwnersService {

  constructor(private http: HttpClient) { }

  ROOT_API = '/api/carOwners';

  getCarOwners(): Observable<CarOwner[]> {
    return this.http.get<CarOwner[]>(this.ROOT_API).pipe(
      map((response) => response),
    );
  }
}
