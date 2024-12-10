
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit{
  LoginRequest: any={
    "email":"",
    "password":""
  };

  ngOnInit() {
    localStorage.clear
  }
  constructor(private http: HttpClient, private router : Router, private route: ActivatedRoute,private toastService: ToastService){

  }

  onLogin(){
    this.http.post('http://localhost:8080/auth/login',this.LoginRequest)
    .subscribe((res:any)=>{
      if(res != null){
          localStorage.setItem('accessToken',res.accessToken);
          this.showSuccessToast
          this.router.navigateByUrl('admin/dashboard')
      }else{
        this.LoginRequest.password =' '
      }
    })
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
