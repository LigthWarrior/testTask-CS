import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

export interface PeriodicElement {
  aLastName: string;
  aFirstName: string;
  aMiddleName: string;
  aCars: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {aLastName: 'Иванов', aFirstName: 'Иван', aMiddleName: 'Иванович', aCars: 1},
  {aLastName: 'Петрова', aFirstName: 'Наталия', aMiddleName: 'Игоревна', aCars: 2},
  {aLastName: 'Антонов', aFirstName: 'Алексей', aMiddleName: 'Сергеевич', aCars: 2},
];

@Component({
  selector: 'app-car-owners',
  templateUrl: './car-owners.component.html',
  styleUrls: ['./car-owners.component.css']
})
export class CarOwnersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['lastName', 'firstName', 'middleName', 'cars'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable) table: any;

  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
    this.table.renderRows();
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }

}
