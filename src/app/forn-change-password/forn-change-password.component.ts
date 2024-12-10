import { Component } from '@angular/core';

@Component({
  selector: 'app-forn-change-password',
  templateUrl: './forn-change-password.component.html',
  styleUrls: ['./forn-change-password.component.scss']
})
export class FornChangePasswordComponent {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  onSubmit() {
    if (this.newPassword === this.confirmPassword) {
      alert('Mật khẩu đã được thay đổi thành công.');

    } else {
      alert('Mật khẩu xác nhận không khớp.');
    }
  }
}
