import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailsComponent } from './components/details/details.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductsComponent } from './components/products/products.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { BrandsComponent } from './components/brands/brands.component';
import { authGuard } from './shared/guards/auth.guard';
import { PaymentComponent } from './components/payment/payment.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { CoderesetComponent } from './components/codereset/codereset.component';

const routes: Routes = [
{path:'',canActivate:[authGuard],component:BlankLayoutComponent,children:
[{path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'products',component:ProductsComponent},
  {path:'cart',component:CartComponent},
  {path:'categories',component:CategoriesComponent},
  {path:'details/:id',component:DetailsComponent},
  {path:'brands',component:BrandsComponent},
  {path:'cart',component:CartComponent},
  {path:'payment/:id',component:PaymentComponent},
  {path:'allorders',component:AllordersComponent},
  {path:'wishlist',component:WishlistComponent}

]
},
  {path:'',component:AuthLayoutComponent,children:[
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'forgetpassword',component:ForgetpasswordComponent},
    {path:'codereset',component:CoderesetComponent},
    
  ]},

  {path:'**',component:NotfoundComponent},
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
