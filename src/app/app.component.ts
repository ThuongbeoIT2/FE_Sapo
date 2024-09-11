import { Component } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularJS';
  constructor(private toastService: ToastService) {}

  
}

