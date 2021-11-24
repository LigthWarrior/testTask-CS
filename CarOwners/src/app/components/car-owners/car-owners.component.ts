import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { CarOwner } from '../../types';
import { CarOwnersService } from '../../services';
import { Subscription } from 'rxjs';

// const ELEMENT_DATA: CarOwner[] = [
//   {aLastName: 'Иванов', aFirstName: 'Иван', aMiddleName: 'Иванович', aCars: 1},
//   {aLastName: 'Петрова', aFirstName: 'Наталия', aMiddleName: 'Игоревна', aCars: 2},
//   {aLastName: 'Антонов', aFirstName: 'Алексей', aMiddleName: 'Сергеевич', aCars: 2},
// ];

@Component({
  selector: 'app-car-owners',
  templateUrl: './car-owners.component.html',
  styleUrls: ['./car-owners.component.css']
})
export class CarOwnersComponent implements OnInit {

  private carOwners: CarOwner[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private carOwnersService: CarOwnersService) { }

  ngOnInit(): void {
    this.subscription.add(this.getCarOwners());
  }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }

  private getCarOwners(): Subscription {
    return this.carOwnersService.getCarOwners().subscribe((carOwner: any) => {
      console.log(carOwner);
      // this.carOwners.push(carOwner);
      this.dataSource = this.carOwners = carOwner;

      console.log(this.carOwners);
    });
  }

  displayedColumns: string[] = ['lastName', 'firstName', 'middleName', 'cars'];
  dataSource = this.carOwners;

  @ViewChild(MatTable) table: any;

  addData() {
    const randomElementIndex = Math.floor(Math.random() * this.carOwners.length);
    this.dataSource.push(this.carOwners[randomElementIndex]);
    this.table.renderRows();
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }

}
