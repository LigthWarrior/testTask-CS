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

  ROOT_URL: string = '/api/carOwners';
  currentId: number = 0;

  getCarOwners(): Observable<CarOwner[]> {
    return this.http.get<CarOwner[]>(this.ROOT_URL).pipe(
      map((response) => response),
    );
  }

  getCarOwnerById(id: number): Observable<CarOwner> {
    this.currentId = id;
    const URL = `${this.ROOT_URL}/${id}`;
    return this.http.get<CarOwner>(URL).pipe(
      map((carOwner: CarOwner) => carOwner),
    );
  }

  createOwner(data: CarOwner): Observable<CarOwner> {
    return this.http.post<CarOwner>(this.ROOT_URL, data);
  }

  editCarOwner(carOwner: CarOwner): Observable<CarOwner> {
    const URL = `${this.ROOT_URL}/${this.currentId}`;

    return this.http.put<CarOwner>(URL, carOwner);
  }

  deleteCarOwner(id: number): Observable<CarOwner[]> {
    const URL = `${this.ROOT_URL}/${id}`;

    return this.http.delete<CarOwner[]>(URL);
  }

}
