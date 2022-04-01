import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logInError: boolean = false;

  form: FormGroup;

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
        'name':['', Validators.required],
        'password':['', Validators.required],
      });
    }

  ngOnInit(): void {
  }

  login() {
    console.log('Enviar datos', this.form.value);
    this.loginService.login({
      name: this.form.value.name,
      password: this.form.value.password,
    }).then(response => {
      this.authService.save(response.token);
      this.router.navigate(['/mainPage']);
    }).catch(error => {
      console.log('Login error', error);
      this.logInError = true;
    });
  }
}
