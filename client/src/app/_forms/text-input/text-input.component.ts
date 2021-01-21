import { Component, Input, Self, OnInit } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {

  @Input() label!:string;
  @Input() type!: Text | string;
  @Input() control!: FormControl;

  constructor() { }

  ngOnInit(): void { }

  showErrors() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }

  // constructor(@Self() public ngControl: NgControl) {
  //   this.ngControl.valueAccessor = this;
  //  }

  // writeValue(obj: any): void {
  //  }
  // registerOnChange(fn: any): void {
  // }
  // registerOnTouched(fn: any): void {
  // }

}
