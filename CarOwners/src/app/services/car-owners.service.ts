import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';
import { Car, CarOwner } from '../types';

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
    const URL = `${this.ROOT_URL}/${id}`;
    return this.http.get<CarOwner>(URL).pipe(
      map((carOwner: CarOwner) => carOwner),
      // tap((carOwner: CarOwner) => this.carOwner$.next(carOwner)),
    );
  }

  createOwner(data: CarOwner): Observable<CarOwner> {
    // const body = JSON.stringify(data);
    return this.http.post<CarOwner>(this.ROOT_URL, data);
  }

  editCarOwner(id: number, carOwner: CarOwner): Observable<CarOwner> {
    const URL = `${this.ROOT_URL}/${id}`;
    // const body = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
      }),
    };

    // const headers = new Headers({
    //    'Content-Type':  'application/json',
    //   });

    // const headers =  new Headers();

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //    'id':  '',
    //   }),
    // };



    return this.http.put<CarOwner>(URL, carOwner, httpOptions);
  }

  deleteCarOwner(id: number): Observable<CarOwner> {
    const URL = `${this.ROOT_URL}/${id}`;

    const httpOptions = {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
      }),
    };

    return this.http.delete<CarOwner>(URL, httpOptions).pipe(
      tap(_ => console.log(`deleted owner id=${id}`)),
    );
  }

}
