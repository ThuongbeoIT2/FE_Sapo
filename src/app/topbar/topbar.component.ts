import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user.model';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  user?: User;
  searchQuery: string = '';
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (data: User) => {
        this.user = data;

      },
      error: (error) => {
        console.error('Error fetching user data', error);
      }
    });
  }
  onSearchClick() {
    console.log('Search query:', this.searchQuery);
    console.log('Current URL:', window.location.href);
    alert(window.location.href)
  }
}
