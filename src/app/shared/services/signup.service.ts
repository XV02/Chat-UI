import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient, private router: Router) { }

  signUp(credentials: any) {
    return new Promise((resolve, reject) => {
      this.http.post<any>('http://localhost:3000/api/users', {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        role: 'mortal',
      }).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err);
        }
      });
    });

  }
}
