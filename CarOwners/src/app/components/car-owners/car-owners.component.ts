import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { CarOwner } from '../../types';
import { CarOwnersService } from '../../services';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-car-owners',
  templateUrl: './car-owners.component.html',
  styleUrls: ['./car-owners.component.css']
})
export class CarOwnersComponent implements OnInit, OnDestroy {

  isDisabledButton: boolean = true;
  private carOwners: CarOwner[] = [];
  private subscription: Subscription = new Subscription();
  currentCarOwnerId: number = 0;
  // currentCarOwner: CarOwner | undefined;


  constructor(
    private carOwnersService: CarOwnersService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.subscription.add(this.getCarOwners());
  }

  private getCarOwners(): Subscription {
    return this.carOwnersService.getCarOwners().subscribe((records: any) => {
      this.dataSource = this.carOwners = records;
    });
  }

  // private getCarOwnerById(currentCarOwnerId: number): Subscription {
  //   return this.carOwnersService.getCarOwnerById(currentCarOwnerId).subscribe((record: CarOwner) => {
  //     this.currentCarOwner = record;
  //   });
  // }

  displayedColumns: string[] = ['lastName', 'firstName', 'middleName', 'cars'];
  dataSource: CarOwner[] = [];
  // clickedRows = new Set<CarOwner[]>();

  @ViewChild(MatTable) table: any;

  // addData(): void {
  //   const randomElementIndex = Math.floor(Math.random() * this.carOwners.length);
  //   this.dataSource.push(this.carOwners[randomElementIndex]);
  //   this.table.renderRows();
  // }

  removeData(): void {
    this.dataSource.pop();
    this.table.renderRows();
  }

  clickOnRows(event: Event): void {

    // if (true) {
    //   document.onclick = ((e) => {
    //     e.stopPropagation();
    //     e.preventDefault();
    //   });
    // }

    this.isDisabledButton = (this.isDisabledButton === true) ? false : true;
    // ???
    let body: any = event.currentTarget;
    body.classList.toggle("demo-row-is-clicked");

    const lastNameOnClick = body.firstElementChild.textContent.trim();
    const currentCarOwner = this.carOwners.find( item => item.lastName === lastNameOnClick);
    if (currentCarOwner?.id !== undefined) {
      this.currentCarOwnerId = currentCarOwner?.id;
    }

  }

  // showRecord(): void {
  //   this.getCarOwnerById(this.currentCarOwnerId);
  // }

  editRecord(): void {
    // this.router.navigate("['/records', currentCarOwnerId]");
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
