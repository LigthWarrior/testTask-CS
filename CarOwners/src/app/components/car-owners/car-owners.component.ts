import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class CarOwnersComponent implements OnInit, OnDestroy {

  isDisabledButton: boolean = true;

  private carOwners: CarOwner[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private carOwnersService: CarOwnersService) { }

  ngOnInit(): void {
    this.subscription.add(this.getCarOwners());
  }

  private getCarOwners(): Subscription {
    return this.carOwnersService.getCarOwners().subscribe((records: any) => {
      console.log(this.carOwners);
      // this.carOwners.push(carOwner);
      this.dataSource = this.carOwners = records;
      // this.carOwners = records;
      console.log(this.carOwners);
    });
  }

  displayedColumns: string[] = ['lastName', 'firstName', 'middleName', 'cars'];
  dataSource: CarOwner[] = [];
  // clickedRows = new Set<CarOwner[]>();

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

  clickOnRows(event: Event) {
    console.log(event);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
