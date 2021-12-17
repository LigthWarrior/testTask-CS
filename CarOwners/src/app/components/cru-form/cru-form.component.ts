import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarOwnersService } from '../../services';
import { CarOwner } from '../../types';

@Component({
  selector: 'app-cru-form',
  templateUrl: './cru-form.component.html',
  styleUrls: ['./cru-form.component.css']
})
export class CruFormComponent implements OnInit, OnDestroy {
  cruForm: any;
  currentCarOwner: CarOwner | undefined;
  currentCarOwnerId: number = 0;
  editable: boolean = false;
  hiddenTemplateEdit: boolean = false;
  hiddenTemplateView: boolean = false;
  private subscription: Subscription = new Subscription();
  years: number[] = [];
  private carsNumberAll: string[] = [];
  private carsNumberWithoutCurrentOwner: string[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private carOwnerService: CarOwnersService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.cruForm = this.fb.group ({
      lastName: new FormControl('', [
        Validators.required,
      ]),
      firstName: new FormControl('', [
        Validators.required,
      ]),
      middleName: new FormControl('', [
        Validators.required,
      ]),
      cars: this.fb.array([]),
    });

    this.setRangeYears();
    this.setCarsNumber();

    const carOwnerId = +this.route.snapshot.params.id;

    if (carOwnerId) {
      this.currentCarOwnerId = carOwnerId;
      this.setCarsNumberWithoutCurrentOwner(carOwnerId);
      this.subscription.add(this.getCarOwnerById(carOwnerId));
      this.isActiveRouter(carOwnerId);
    } else {
      this.addCar();
    }
  }

  private setRangeYears(): void {
    const currentYear = new Date().getFullYear();
    for (let i = 1990; i <= currentYear; i++) this.years.push(i);
  }

  private getCarOwnerById(id: number): void {
    this.carOwnerService.getCarOwnerById(id).subscribe((record: CarOwner) => {
      this.currentCarOwner = record;
      this.setCarOwnerFormFields();
      this.setCarsFormFields();
    });
  }

  private setCarsNumber(): void {
    this.carOwnerService.getCarOwners().subscribe((records: CarOwner[]) => {
      records.map(item => item.cars.forEach(item => this.carsNumberAll.push(item.number)));
    });
  }

  private setCarsNumberWithoutCurrentOwner(id: number): void {
    this.carOwnerService.getCarOwners().subscribe((records: CarOwner[]) => {
      const carOwnersWithoutCurrent = records.filter(item => item.id !== id);
      carOwnersWithoutCurrent.map(item => item.cars.forEach(item => this.carsNumberWithoutCurrentOwner.push(item.number)));
    });
  }

  private setCarOwnerFormFields(): void {
    const formControls = this.cruForm.controls;
    formControls.lastName.value = this.currentCarOwner?.lastName;
    formControls.firstName.value = this.currentCarOwner?.firstName;
    formControls.middleName.value = this.currentCarOwner?.middleName;
  }

  private setCarsFormFields(): void {
      this.currentCarOwner?.cars.forEach((item, index) => {
        this.addCar();
        const formCarsControls = this.cruForm.controls.cars.controls[index].controls;
        formCarsControls.number.value = item.number;
        formCarsControls.brand.value = item.brand;
        formCarsControls.model.value = item.model;
        formCarsControls.year.value = item.year;
    });
  }

  private isActiveRouter(id: number): void {
    if (this.router.url === `/records/${id}/edit`) {
      this.hiddenTemplateView = true;
    } else {
      this.hiddenTemplateEdit = true;
    }
  }

  cars(): FormArray {
    return this.cruForm.get('cars') as FormArray;
  }

  newCar(): FormGroup {
    return new FormGroup ({
      number: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z]{2}[0-9]{4}[A-Z]{2}$/),
      ]),
      brand: new FormControl('', [
        Validators.required,
      ]),
      model: new FormControl('', [
        Validators.required,
      ]),
      year: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  addCar(): void {
    this.cars().push(this.newCar());
  }

  removeCar(i: number): void {
    this.cars().removeAt(i);
  }

  isControlInvalid(fieldName: string): boolean {
    return (this.cruForm.get(fieldName).invalid
      && (this.cruForm.get(fieldName).dirty
      || this.cruForm.get(fieldName).touched));
  }

  getControlError(controlName: string): string | null {
    const control = this.cruForm.get(controlName);
    if (control.errors.required) {
      return 'Поле не может быть пустым';
    }
    return null;
  }

  isUniqueNumbers(index: number): boolean {
    const carNumberValue = this.cruForm.value.cars[index].number;

    return (this.router.url === '/record')
      ? this.carsNumberAll.includes(carNumberValue)
      : this.carsNumberWithoutCurrentOwner.includes(carNumberValue);
  }

  isEqualNumbers(): boolean {
    const carsNumberValue = this.cruForm.value.cars;
    const carsNumberWithoutLast = [];
    const results = [];

    for (let index = 0; index < carsNumberValue.length - 1; index++) {
      carsNumberWithoutLast.push(carsNumberValue[index].number);
    }

    for (let number of carsNumberWithoutLast) {
      if (carsNumberValue[carsNumberValue.length - 1].number === number) {
        results.push(number);
      }
    }
    return (results.length !== 0) ? true : false;
  }

  save(): void {
    if (this.cruForm.invalid) return;

    let jsonData = this.cruForm.value;
    jsonData.id = this.currentCarOwnerId;

    this.carOwnerService.editCarOwner(jsonData).subscribe(() => {
      this.router.navigate(['/records']);
    });
  }

  submit(): void {
    if (this.cruForm.invalid) return;

    const jsonData = this.cruForm.value;

    this.carOwnerService.createOwner(jsonData).subscribe(() => {
      this.router.navigate(['/records']);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
