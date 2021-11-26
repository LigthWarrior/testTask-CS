import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cru-form',
  templateUrl: './cru-form.component.html',
  styleUrls: ['./cru-form.component.css']
})
export class CruFormComponent implements OnInit {

  eventForm: any;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.eventForm = this.fb.group ({
      lastName: new FormControl('',
        [Validators.required],
      ),
      firstName: new FormControl('',
        [Validators.required],
      ),
      middleName: new FormControl('',
        [Validators.required],
      ),
      requests_attributes: this.fb.array([]),
    });
  }

  requests_attributes(): FormArray {
    return this.eventForm.get('requests_attributes') as FormArray;
  }

  newRequirement(): FormGroup {
    return new FormGroup ({
      description: new FormControl(''),
    });
  }

  addRequirement(): void {
    this.requests_attributes().push(this.newRequirement());
  }

  removeRequirement(i: number): void {
    this.requests_attributes().removeAt(i);
  }

  isControlInvalid(fieldName: string): boolean {
    return (this.eventForm.get(fieldName).invalid
      && (this.eventForm.get(fieldName).dirty
      || this.eventForm.get(fieldName).touched));
  }

  getControlError(controlName: string): string | null {
    const control = this.eventForm.get(controlName);
    if (control.errors.required) {
      return 'Поле не может быть пустым';
    }
    return null;
  }

  submit(): void {
    if (this.eventForm.invalid) {
      return;
    }
  }

}
