import { WishlistService } from './../../shared/service/wishlist.service';
import { Component, OnInit } from '@angular/core';
import { EcommdataService } from 'src/app/shared/service/ecommdata.service';
import { Product } from 'src/app/shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/service/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  constructor(private _EcommdataService:EcommdataService ,private _CartService:CartService,private _WishlistService:WishlistService){}

  images:any[]=[]
  wishlist:any[]=[]
productDetails:Product={} as Product;

  ngOnInit(): void {
      this._WishlistService.getUserWishList().subscribe({
        next:(response)=>{
          this.wishlist=response.data
          console.log(this.wishlist);
          
        }
      })
  }

  
addToCart(id:string){
  this._CartService.addToCart(id).subscribe({
    next:(response)=>{
      console.log(response);
      
    }
  })
}


delete(id:string){
  this._WishlistService.removefromwishlist(id).subscribe({
    next:()=>{
      this._WishlistService.getUserWishList().subscribe({
        next:(response)=>{
          this.wishlist=response.data
          console.log(this.wishlist);
          
        }
      })
      
    }
  })
  // console.log(id);
  
}
}
