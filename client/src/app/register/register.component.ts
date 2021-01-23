import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  validationErrors: string[] =[];
  registerForm!: FormGroup;
  usernameControl!: FormControl;
  passwordControl!: FormControl;
  passwordConfirmControl!: FormControl;
  dateOfBirthControl!: FormControl;
  knownAsControl!: FormControl;
  cityControl!: FormControl;
  countryControl!: FormControl;
  maxDate!: Date;

  constructor(private accountService: AccountService,
              private toastr: ToastrService,
              private fb: FormBuilder, 
              private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  initializeForm() {
      this.registerForm = this.fb.group({
      username: ['', Validators.required],
      gender: ['male'],
      dateOfBirth: ['', Validators.required],
      knownAs: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValue('password')]]
    })
     
    this.usernameControl = this.registerForm.get('username') as FormControl;
    this.passwordControl = this.registerForm.get('password') as FormControl;
    this.passwordConfirmControl = this.registerForm.get('confirmPassword') as FormControl;
    this.dateOfBirthControl = this.registerForm.get('dateOfBirth') as FormControl;
    this.knownAsControl = this.registerForm.get('knownAs') as FormControl;
    this.cityControl = this.registerForm.get('city') as FormControl;
    this.countryControl = this.registerForm.get('country') as FormControl;
  
  }

  matchValue(matchTo: string) : ValidatorFn{
      return (control: AbstractControl | any) => {
        return control.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true}
      }
  }

  register(){
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/members');
    }, error => {
       this.validationErrors = error;
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
