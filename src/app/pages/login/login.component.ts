import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

    LoginRequest: any={
      "email":"",
      "password":""
    };
    SignUpRequest: any = {
      name: '',
      email: '',
      password: ''
    };
    ngOnInit() {
      localStorage.clear();
    }
    constructor(private http: HttpClient, private router : Router, private route: ActivatedRoute,private toastService: ToastService){
      localStorage.removeItem('storeCode');
      this.route.queryParams.subscribe(params => {
        const token = params['token'];
        if (token) {
          const encodedToken = encodeURIComponent(token);
          this.http.get<boolean>(`http://localhost:8080/validtoken?token=${encodedToken}`).subscribe((res: boolean) => {
            if (res) {
              this.showSuccessToast('Thành công!', 'Bạn đã đăng nhập thành công!');
              localStorage.setItem('accessToken', token);
              this.router.navigateByUrl('dashboard');
            } else {
              this.showErrorToast('Thất bại!', 'Không hỗ trợ!');
              this.router.navigateByUrl('error');
            }
          });
        }
      });

    }
    onRegister() {
      if (!this.SignUpRequest.name || !this.SignUpRequest.email || !this.SignUpRequest.password) {
        this.showErrorToast('Thất bại!', 'Vui lòng điền tất cả các trường!');
        return;
      }
      this.http.post('http://localhost:8080/auth/signup', this.SignUpRequest)
        .subscribe((res: any) => {
          if (res != null) {
            this.showSuccessToast('Thành công!', 'Bạn đã đăng ký thành công!');
            this.SignUpRequest.name ='',
            this.SignUpRequest.email= '',
            this.SignUpRequest.password= ''
            this.router.navigateByUrl('login');
          } else {
            this.showErrorToast('Thất bại!', 'Đăng ký không thành công!');
          }
        });
    }
    onLogin(){
      this.http.post('http://localhost:8080/auth/login',this.LoginRequest)
      .subscribe((res:any)=>{
        if(res != null){
            localStorage.setItem('accessToken',res.accessToken);
            this.router.navigateByUrl('dashboard')
        }else{
          this.LoginRequest.password =' '
        }
      })
    }

    onLoginWithGoogle(): void {
      // Redirect to the Google OAuth2 login URL
      window.location.href = 'http://localhost:8080/oauth2/authorize/google';

    }
    showSuccessToast(title: string, message: string) {
      this.toastService.showToast({
        title: title,
        message: message,
        type: 'success',
        duration: 2000
      });
    }

    showErrorToast(title: string, message: string) {
      this.toastService.showToast({
        title: title,
        message: message,
        type: 'error',
        duration: 2000
      });
    }

}
