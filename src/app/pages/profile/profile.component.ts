import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!: User;
  path!:string;
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const url = new URL(window.location.href);
    if (url.pathname.includes('profile')) {
        this.path = 'profile';
    } else if (url.pathname.includes('settings')) {
        this.path = 'settings';
    } else if (url.pathname.includes('myStore')) {
        this.path = 'myStore';
    }else if (url.pathname.includes('change-password')) {
      this.path = 'change-password';
  } else {
      console.log('invalid path');
    }

    this.userService.getCurrentUser().subscribe({
      next: (data: User) => {
        this.user = data;

      },
      error: (error) => {
        console.error('Error fetching user data', error);
      }
    });
  }
  logout(): void {
    this.userService.logout();
  }
}
