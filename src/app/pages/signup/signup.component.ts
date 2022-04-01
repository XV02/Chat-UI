import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms' 
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  showPassword: boolean = false;

  form: FormGroup;

  serverError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router) {
    this.form = this.formBuilder.group({
      'name':['', Validators.required],
      //'username': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'password':['', [Validators.required, Validators.minLength(8)]],
      'confirm':['', [Validators.required, Validators.minLength(8)]],
      'terms':['', Validators.requiredTrue]
    },
      {
        validators: 
          [this.matchPasswords.bind(this)]
        //Validaciones asíncronas, ver si el usuario ya existe en la base de datos
      });
   }

  ngOnInit(): void {
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  //submit
  sendData(){
    //enviar datos
    if(this.form.valid){
      console.log('enviar datos', this.form);
      console.log(this.form.value);
      this.http.post<any>('http://localhost:3000/api/users', {
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password,
        role: 'mortal',
      }).subscribe({
        next: (data) => {
          console.log('data', data);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log('error', err);
          this.serverError = true;
        }
      });
    }else{
    //datos incompletos
      console.log('error, faltan datos.', this.form)
    }
  }

  matchPasswords(){
    if (!this.form) return;
    const {password, confirm} = this.form.getRawValue();
    if(password === confirm){
      return null;
    }else{
      return {passwordMismatch:true}
    }
  }
}
