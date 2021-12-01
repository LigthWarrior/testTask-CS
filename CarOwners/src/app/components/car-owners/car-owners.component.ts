import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { CarOwner } from '../../types';
import { CarOwnersService } from '../../services';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
  carOwnerId: number = 0;

  private lastNameOnClick: string = '';
  private carOwners: CarOwner[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private carOwnersService: CarOwnersService,
    private route: ActivatedRoute
    ) { }

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

  addData(): void {
    const randomElementIndex = Math.floor(Math.random() * this.carOwners.length);
    this.dataSource.push(this.carOwners[randomElementIndex]);
    this.table.renderRows();
  }

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

    this.lastNameOnClick = body.firstElementChild.textContent;
    let ttt = body.firstElementChild.textContent;
    let tempCarOwner = this.dataSource.find(item => item.lastName === 'Иванов');
    // this.carOwnerId = tempCarOwner?.id;
    // console.log(tempCarOwner);
    // console.log(body);
    // console.log(body.firstElementChild.textContent);
  }

  showRecord(): void {
    // console.log(this.lastNameOnClick);
    // const carOwnerId = +this.route.snapshot.params.id;
    // console.log('id: ', this.carOwnerId);
    // this.carOwner$ = this.carOwnersService.carOwner$;
    this.carOwnersService.getCarOwnerById(this.carOwnerId).subscribe(console.log);
    // console.log('srv: ', srv);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
