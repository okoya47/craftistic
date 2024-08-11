import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CRAFTISTIC';

  constructor(private router: Router) {}

  isAuthPage(): boolean {
    return this.router.url === '/signup' || this.router.url === '/login';
  }
}
