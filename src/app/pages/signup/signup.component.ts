import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { SignupService } from 'src/app/shared/services/signup.service';

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
    private signUpService: SignupService,
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
      this.signUpService.signUp({
        name: this.form.value.name,
        password: this.form.value.password,
        email: this.form.value.email,
      }).then(response => {
        console.log(response);
        this.router.navigate(['/login']);
      }).catch(error => {
        console.log(error);
        this.serverError = true;
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
