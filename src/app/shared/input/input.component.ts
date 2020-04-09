import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() isTextarea = false;
  @Input() type = 'text';
  control: FormControl;
  @Input('control')
  set setFormControl(formGroup: AbstractControl) {
    this.control = formGroup as FormControl;
  }
  @Input() label: string;

  constructor() { }

  ngOnInit(): void {
  }

  showErrors() {
    const { dirty, touched, errors } = this.control;
    return dirty && errors;
  }
}
