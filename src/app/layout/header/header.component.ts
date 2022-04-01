import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.loginStatus.subscribe(value => {
      this.isLoggedIn = value;
    });
   }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.remove();
    this.router.navigate(['/login']);
  }
}
