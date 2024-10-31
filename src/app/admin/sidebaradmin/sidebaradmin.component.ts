import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebaradmin',
  templateUrl: './sidebaradmin.component.html',
  styleUrls: ['./sidebaradmin.component.scss']
})
export class SidebaradminComponent {

  currentUrl!: string;

  constructor(private router: Router, private userService: UserService) {
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
    });
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
