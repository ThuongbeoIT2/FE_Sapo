import { Component } from '@angular/core';
import { Toast, ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toastsuccess',
  templateUrl: './toastsuccess.component.html',
  styleUrls: ['./toastsuccess.component.scss']
})
export class ToastsuccessComponent {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toasts.subscribe((toasts: Toast[]) => {
      this.toasts = toasts;
    });
  }

  removeToast(toast: Toast) {
    this.toastService.removeToast(toast);
  }
}
