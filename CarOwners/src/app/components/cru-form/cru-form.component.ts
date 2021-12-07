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
  // private ccarOwnerId: number = 0;
  editable: boolean = false;
  // hidden: boolean = false;
  hiddenTemplateEdit: boolean = false;
  hiddenTemplateView: boolean = false;
  private subscription: Subscription = new Subscription();
  // currentRouterLink: String = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private carOwnerService: CarOwnersService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // this.hiddenTemplateEdit = false;
    // this.hiddenTemplateView = false;

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

    const carOwnerId = +this.route.snapshot.params.id;




    // switch(this.router.url) {
    //   case '/record/12':
    //     console.log(this.router.url);
    //     console.log(`/record/${id}`);
    //   this.hiddenTemplateEdit = true;
    //   break;
    //   case `/record/${id}/edit`:
    //   this.hiddenTemplateAdd = true;
    //   break;
    //   default:
    // };

    if (carOwnerId) {

      this.subscription.add(this.getCarOwnerById(carOwnerId));
      this.isActiveRouter(carOwnerId);



    } else {

      this.addCar();
    }



  }

  // ngAfterViewInit() {
  //   this.hiddenTemplateEdit = false;
  //   this.hiddenTemplateView = false;
  //   const id: any = this.currentCarOwner?.id;
  //   this.isActiveRouter(this.ccarOwnerId);
  // }

  private getCarOwnerById(id: number): void {
    this.carOwnerService.getCarOwnerById(id).subscribe((record: CarOwner) => {
      this.currentCarOwner = record;
      // this.isActiveRouter(id);
      // this.hiddenTemplateEdit = true;
      // this.hiddenTemplateAdd = true;
      this.setCarOwnerFormFields();
      this.setCarsFormFields();
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
    }
     else {
      this.hiddenTemplateEdit = true;
    }
  }

  // isActiveRouter(id: number): boolean {
  //   if (this.router.url === `/records/${this.currentCarOwner?.id}/edit`) {
  //     return true;
  //   } else {
  //     return true;
  //   }
  // }

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



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
