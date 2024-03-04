
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';
import { EcommdataService } from 'src/app/shared/service/ecommdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor(
    private _EcommdataService:EcommdataService,private _CartService:CartService,private _ToastrService: ToastrService ,){}
    productId:string=''
    products:Product[]=[]
    categories:any[]=[]
    SearchItem:string=''

    ngOnInit(): void {
  
      this._EcommdataService.getProducts().subscribe({
        next:(Response)=>{
          
          this.products = Response.data
          
          
        }
      })
      
     
    }

    addToCart(id:string){
      this._CartService.addToCart(id).subscribe({
        next:(response)=>{console.log(response);
          this._ToastrService.success(response.message)
        }
      })
    }
  
}

