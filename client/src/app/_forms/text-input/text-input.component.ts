import { Text } from '@angular/compiler/src/render3/r3_ast';
import { Component, Input, Self, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {

  @Input() label!: string;
  @Input() type = 'text';
  @Input() control!: FormControl;

  constructor() { }

  ngOnInit(): void { }

  showErrors() {
    const { touched, errors } = this.control;
    return touched && errors;
  }

}
