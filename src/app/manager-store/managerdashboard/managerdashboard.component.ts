import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managerdashboard',
  templateUrl: './managerdashboard.component.html',
  styleUrls: ['./managerdashboard.component.scss']
})
export class ManagerdashboardComponent {
  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
