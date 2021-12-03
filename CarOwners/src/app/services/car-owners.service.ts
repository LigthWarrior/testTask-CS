import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarOwner } from '../types';

@Injectable({
  providedIn: 'root'
})
export class CarOwnersService {
  // carOwner$: BehaviorSubject<CarOwner> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  ROOT_URL = '/api/carOwners';

  getCarOwners(): Observable<CarOwner[]> {
    return this.http.get<CarOwner[]>(this.ROOT_URL).pipe(
      map((response) => response),
    );
  }

  getCarOwnerById(id: number): Observable<CarOwner> {
    return this.http.get<CarOwner>(`${this.ROOT_URL}/${id}`).pipe(
      map((carOwner: CarOwner) => carOwner),
      // tap((carOwner: CarOwner) => this.carOwner$.next(carOwner)),
    );
  }

  createOwner(data: Event): Observable<any> {
    // const body = JSON.stringify(data);
    return this.http.post<Event>(this.ROOT_URL, data);
  }

}
