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

import { TopbarComponent } from './topbar/topbar.component';
import { ManagerproductComponent } from './manager-store/managerproduct/managerproduct.component';
import { PaginationWrapperComponent } from './pagination-wrapper/pagination-wrapper.component';
import { SidebaradminComponent } from './admin/sidebaradmin/sidebaradmin.component';
import { OveralladminComponent } from './admin/overalladmin/overalladmin.component';
import { StoretypeComponent } from './admin/storetype/storetype.component';
import { ManageStoreTypeComponent } from './manage-store-type/manage-store-type.component';
import { AddStoreTypeFormComponent } from './store_type_form/add-store-type-form/add-store-type-form.component';
import { UpdateStoreTypeFormComponent } from './store_type_form/update-store-type-form/update-store-type-form.component';
import { CategoryComponent } from './admin/category/category.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { AddCategoryFormComponent } from './category-form/add-category-form/add-category-form.component';
import { UpdateCategoryFormComponent } from './category-form/update-category-form/update-category-form.component';
import { ProductAdminComponent } from './admin/product-admin/product-admin.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { AddProductFormComponent } from './product-form/add-product-form/add-product-form.component';
import { UpdateProductFormComponent } from './product-form/update-product-form/update-product-form.component';
import { StoreComponent } from './admin/store/store.component';
import { ManageStoreComponent } from './manage-store/manage-store.component';
import { DetailStoreComponent } from './detail-store/detail-store.component';
import { AboutComponent } from './pages/about/about.component';
import { BannerEventComponent } from './pages/banner-event/banner-event.component';
import { CountdownComponent } from './pages/countdown/countdown.component';
import { ItemCategoryComponent } from './pages/card-item/item-category/item-category.component';
import { HomeCategoryComponent } from './pages/home-category/home-category.component';
import { CategoryDetailCardComponent } from './pages/card-item/category-detail-card/category-detail-card.component';
import { CategoryDasboardComponent } from './pages/category-dasboard/category-dasboard.component';
import { ItemProductComponent } from './pages/card-item/item-product/item-product.component';
import { ProductDetailCardComponent } from './pages/card-item/product-detail-card/product-detail-card.component';
import { HomeProductComponent } from './pages/home-product/home-product.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { ProductDashboardComponent } from './pages/product-dashboard/product-dashboard.component';
import { ItemEventComponent } from './pages/item-event/item-event.component';
import { IndentityComponent } from './pages/indentity/indentity.component';
import { SettingComponent } from './setting/setting.component';
import { MyStoreComponent } from './my-store/my-store.component';
import { PasswordComponent } from './password/password.component';
import { ListSettingComponent } from './list-setting/list-setting.component';
import { MyStoreLoginComponent } from './my-store-login/my-store-login.component';
import { StoredashboardComponent } from './storedashboard/storedashboard.component';
import { ManageProductOsComponent } from './manage-product-os/manage-product-os.component';
import { AllCategoryComponent } from './all-category/all-category.component';
import { ProductOsAddFormComponent } from './product-os-form/product-os-add-form/product-os-add-form.component';
import { ProductOsUpdateFormComponent } from './product-os-form/product-os-update-form/product-os-update-form.component';
import { ProductOSDetailComponent } from './product-os-detail/product-os-detail.component';
import { EvaluateComponent } from './pages/evaluate/evaluate.component';
import { ProductOsDetailClientComponent } from './pages/card-item/product-os-detail-client/product-os-detail-client.component';
import { CartComponent } from './cart/cart.component';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { BillpaymentComponent } from './billpayment/billpayment.component';
import { OrderDetailUserComponent } from './order-detail-user/order-detail-user.component';
import { OrderProcessComponent } from './order-process/order-process.component';
import { HeaderShopComponent } from './header-shop/header-shop.component';
import { FeaturesComponent } from './features/features.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { HelpAdminComponent } from './admin/help-admin/help-admin.component';

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
     TopbarComponent,
     ManagerproductComponent,
     PaginationWrapperComponent,
     SidebaradminComponent,
     OveralladminComponent,
     StoretypeComponent,
     ManageStoreTypeComponent,
     AddStoreTypeFormComponent,
     UpdateStoreTypeFormComponent,
     CategoryComponent,
     ManageCategoryComponent,
     AddCategoryFormComponent,
     UpdateCategoryFormComponent,
     ProductAdminComponent,
     ManageProductComponent,
     AddProductFormComponent,
     UpdateProductFormComponent,
     StoreComponent,
     ManageStoreComponent,
     DetailStoreComponent,
     AboutComponent,
     BannerEventComponent,
     CountdownComponent,
     ItemCategoryComponent,
     HomeCategoryComponent,
     CategoryDetailCardComponent,
     CategoryDasboardComponent,
     ItemProductComponent,
     ProductDetailCardComponent,
     HomeProductComponent,
     FavoriteComponent,
     ProductDashboardComponent,
     ItemEventComponent,
     IndentityComponent,
     SettingComponent,
     MyStoreComponent,
     PasswordComponent,
     ListSettingComponent,
     MyStoreLoginComponent,
     StoredashboardComponent,
       ManageProductOsComponent,
       AllCategoryComponent,
       ProductOsAddFormComponent,
       ProductOsUpdateFormComponent,
       ProductOSDetailComponent,
       EvaluateComponent,
       ProductOsDetailClientComponent,
       CartComponent,
       CartDetailComponent,
       BillpaymentComponent,
       OrderDetailUserComponent,
       OrderProcessComponent,
       HeaderShopComponent,
       FeaturesComponent,
       CommentListComponent,
       HelpAdminComponent
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
