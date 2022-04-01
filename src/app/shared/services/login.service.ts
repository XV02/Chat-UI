import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(credentials: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<any>('http://localhost:3000/api/users/signIn', {
        name: credentials.name,
        password: credentials.password,
      }).subscribe({
        next: (data) => {
          resolve({
            token: data.token
          });
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }
}
