import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarOwnersService } from 'src/app/services';
import { CarOwner } from 'src/app/types';

@Component({
  selector: 'app-cru-form',
  templateUrl: './cru-form.component.html',
  styleUrls: ['./cru-form.component.css']
})
export class CruFormComponent implements OnInit {

  cruForm: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private carOwnerService: CarOwnersService,
  ) { }

  ngOnInit(): void {
    this.cruForm = this.fb.group ({
      lastName: new FormControl('',
        [Validators.required],
      ),
      firstName: new FormControl('',
        [Validators.required],
      ),
      middleName: new FormControl('',
        [Validators.required],
      ),
      cars: this.fb.array([]),
    });
    this.addCar();
  }

  cars(): FormArray {
    return this.cruForm.get('cars') as FormArray;
  }

  newCar(): FormGroup {
    return new FormGroup ({
      number: new FormControl(''),
      brand: new FormControl(''),
      model: new FormControl(''),
      year: new FormControl(''),
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

  submit(): void {
    if (this.cruForm.invalid) {
      return;
    }

    const jsonData = this.cruForm.value;

    this.carOwnerService.createOwner(jsonData).subscribe((response: CarOwner) => {
      console.log(response);
      this.router.navigate(['/records']);
    });

    // this.carOwnerService.createOwner(jsonData).subscribe((response: CarOwner) => {
    //   this.router.navigate(['/posts', response.id]);
    // });
  }

}
