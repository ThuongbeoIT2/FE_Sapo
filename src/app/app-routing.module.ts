import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './services/guard/auth.guard'
import { MyprofileComponent } from './myprofile/myprofile.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { ManagerdashboardComponent } from './manager-store/managerdashboard/managerdashboard.component';
import { ManagerproductComponent } from './manager-store/managerproduct/managerproduct.component';
import { PaginationWrapperComponent } from './pagination-wrapper/pagination-wrapper.component';

import { StoretypeComponent } from './admin/storetype/storetype.component';
import { CategoryComponent } from './admin/category/category.component';
import { ProductAdminComponent } from './admin/product-admin/product-admin.component';
import { StoreComponent } from './admin/store/store.component';
import { AboutComponent } from './pages/about/about.component';
import { CategoryDasboardComponent } from './pages/category-dasboard/category-dasboard.component';
import { ProductDashboardComponent } from './pages/product-dashboard/product-dashboard.component';
import { SettingComponent } from './setting/setting.component';
import { MyStoreComponent } from './my-store/my-store.component';
import { PasswordComponent } from './password/password.component';
import { StoredashboardComponent } from './storedashboard/storedashboard.component';
import { ManageProductOsComponent } from './manage-product-os/manage-product-os.component';
import { AllCategoryComponent } from './all-category/all-category.component';
import { ProductOsDetailClientComponent } from './pages/card-item/product-os-detail-client/product-os-detail-client.component';


const routes: Routes = [
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path:'admin/dashboard',
    component:AdmindashboardComponent,
    canActivate: [authGuard]
  },
  {
    path:'admin/store',
    component:StoreComponent,
    canActivate: [authGuard]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'about',
    component:AboutComponent
  },
  {
    path:'admin/storetype',
    component:StoretypeComponent,
    canActivate: [authGuard]
  },
  {
    path:'admin/category',
    component:CategoryComponent,
    canActivate: [authGuard]
  },
  {
    path:'admin/product',
    component:ProductAdminComponent,
    canActivate: [authGuard]
  },
  {
    path:'store-dashboard',
    component:StoredashboardComponent,
    canActivate: [authGuard]
  },
  {
    path:'admin/login',
    component:AdminloginComponent
  },
  {
    path:'store-product',
    component:ManagerproductComponent
  },
  {
    path:'page',
    component:PaginationWrapperComponent
  },
  {
    path:'profile',
    component:MyprofileComponent,
    canActivate: [authGuard]
  },
  {
    path:'change-password',
    component:PasswordComponent,
    canActivate: [authGuard]
  },
  {
    path:'settings',
    component:SettingComponent,
    canActivate: [authGuard]
  },
  {
    path:'productOS-detail',
    component:ProductOsDetailClientComponent,
    canActivate: [authGuard]
  },
  {
    path:'manage-product-os',
    component:ManageProductOsComponent,
    canActivate: [authGuard]
  },
  {
    path:'all-categories',
    component:AllCategoryComponent,
    canActivate: [authGuard]
  },
  {
    path:'myStore',
    component:MyStoreComponent,
    canActivate: [authGuard]
  },
  {
    path:'category-detail',
    component:CategoryDasboardComponent,
    canActivate: [authGuard]
  },
  {
    path:'product-detail',
    component:ProductDashboardComponent,
    canActivate: [authGuard]
  },
  {
    path:' ',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:' ',
    component:LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path:'dashboard',
        component:DashboardComponent,
        canActivate: [authGuard]
      }
  ]
  },
  {
    path:'**',
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
