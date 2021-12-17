import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarOwner } from '../../types';
import { CarOwnersService } from '../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-car-owners',
  templateUrl: './car-owners.component.html',
  styleUrls: ['./car-owners.component.css']
})
export class CarOwnersComponent implements OnInit, OnDestroy {
  isDisabledButton: boolean = true;
  carOwners: CarOwner[] = [];
  private subscription: Subscription = new Subscription();
  currentCarOwnerId: number = 0;
  displayedColumns: string[] = ['lastName', 'firstName', 'middleName', 'cars'];

  constructor(private carOwnersService: CarOwnersService) { }

  ngOnInit(): void {
    this.subscription.add(this.getCarOwners());
  }

  private getCarOwners(): Subscription {
    return this.carOwnersService.getCarOwners().subscribe((records: CarOwner[]) => {
      this.carOwners = records;
    });
  }

  // dataSource: CarOwner[] = [];
  // @ViewChild(MatTable) table: any;

  private returnToStartState(): void {
    const trNodes: any = document.getElementsByTagName("tr");

    for (let tr of trNodes) {
      tr.classList.remove("row-is-clicked");
    }

    this.isDisabledButton = true;
  }

  clickOnRows(event: Event): void {
    this.returnToStartState();

    this.isDisabledButton = false;

    let tableRow: any = event.currentTarget;
    tableRow.classList.add("row-is-clicked");

    const lastNameOnClick = tableRow.firstElementChild.textContent.trim();
    const currentCarOwner = this.carOwners.find( item => item.lastName === lastNameOnClick);
    if (currentCarOwner?.id !== undefined) {
      this.currentCarOwnerId = currentCarOwner?.id;
    }

    document.addEventListener('click', (event): void => {
      const temp: any = event.target;
      const tagOnClick = temp.tagName.toLowerCase();

      if (tagOnClick !== 'td') {
        this.returnToStartState();
      }
    });

  }

  deleteRecord(): void {
    this.carOwnersService.deleteCarOwner(this.currentCarOwnerId).subscribe(() => {
      this.getCarOwners();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
