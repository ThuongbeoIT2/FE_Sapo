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
    path:'manager/dashboard',
    component:ManagerdashboardComponent
  },
  {
    path:'admin/login',
    component:AdminloginComponent
  },
  {
    path:'managerproduct',
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
