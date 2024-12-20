import { Component } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {
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
