import { Component, Input, Self, OnInit } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css']
})
export class DateInputComponent implements OnInit{

  @Input() label!: string;
  @Input() maxDate!: Date;
  bsConfig!: Partial<BsDatepickerConfig>;
  @Input() control!: FormControl;

  constructor() { 
    this.bsConfig = {
      containerClass: 'theme-red',
      dateInputFormat: 'DD MMMM YYYY'
    }
  }

  ngOnInit(): void { }

  showErrors() {
    const { touched, errors } = this.control;
    return touched && errors;
  }

}
