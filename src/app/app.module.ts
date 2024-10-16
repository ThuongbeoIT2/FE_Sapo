import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { CustomeInterceptor } from './services/custome.interceptor';
import { Oauth2RedirectHandlerComponent } from './services/oauth2-redirect-handler/oauth2-redirect-handler.component';
import { ToastsuccessComponent } from './toastmessage/toastsuccess/toastsuccess.component';
import { FooterComponent } from './default-layout/footer/footer.component';

import { NavigationComponent } from './navigation/navigation.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchComponent } from './search/search.component';
import { SliderloginComponent } from './sliderlogin/sliderlogin.component';
import { ContactformComponent } from './default-layout/contactform/contactform.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ManagerdashboardComponent } from './manager-store/managerdashboard/managerdashboard.component';
import { OverallComponent } from './manager-store/overall/overall.component';
import { Searchv02Component } from './searchv02/searchv02.component';
import { ProductComponent } from './manager-store/product/product.component';
import { SidebarmanagerComponent } from './sidebarmanager/sidebarmanager.component';
import { TopbarComponent } from './topbar/topbar.component';
import { ManagerproductComponent } from './manager-store/managerproduct/managerproduct.component';
import { PaginationWrapperComponent } from './pagination-wrapper/pagination-wrapper.component';
import { SidebaradminComponent } from './admin/sidebaradmin/sidebaradmin.component';
import { OveralladminComponent } from './admin/overalladmin/overalladmin.component';
import { StoretypeComponent } from './admin/storetype/storetype.component';
import { ManageStoreTypeComponent } from './manage-store-type/manage-store-type.component';
import { AddStoreTypeFormComponent } from './store_type_form/add-store-type-form/add-store-type-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    Oauth2RedirectHandlerComponent,
    ToastsuccessComponent,
    FooterComponent,
    NavigationComponent,
    ProfileComponent,
    SearchComponent,

    SliderloginComponent,
    ContactformComponent,
    MyprofileComponent,
    AdmindashboardComponent,
    AdminloginComponent,

    NavbarComponent,
     ManagerdashboardComponent,
     OverallComponent,
     Searchv02Component,
     ProductComponent,
     SidebarmanagerComponent,
     TopbarComponent,
     ManagerproductComponent,
     PaginationWrapperComponent,
     SidebaradminComponent,
     OveralladminComponent,
     StoretypeComponent,
     ManageStoreTypeComponent,
     AddStoreTypeFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomeInterceptor,
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
