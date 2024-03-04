import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';
import { EcommdataService } from 'src/app/shared/service/ecommdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/shared/service/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  {

constructor(
  private _EcommdataService:EcommdataService ,
  private _Router:Router ,
  private _CartService:CartService,
  private _ToastrService: ToastrService,
  private _WishlistService:WishlistService ){}


products:Product[]=[]
SearchItem:string=''

dynamicCategories: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  autoplay:true,
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: true
}


staticCategories: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  autoplay:false,
items:1,
  nav: true
}

categories:any[]=[]
productId:string=''
  ngOnInit(): void {
  
    this._EcommdataService.getProducts().subscribe({
      next:(Response)=>{
        
        this.products = Response.data
        
        
      }
    })
    
    this._CartService.getUserCart().subscribe({
      next:(response)=>{
        
        console.log('home before add',response.numOfCartItems);
      }
    })
   

    this._EcommdataService.getAllCategories().subscribe({
      next:(response)=>{
        this.categories= response.data;
        
      }
    })

    this._WishlistService.getUserWishList().subscribe({
      next:(response)=>{
       
       
       response.data.forEach((element:any) => {
        this.favProducts.push(element._id)});
        
        
       
      }
    })


  }

addToCart(id:string){
  this._CartService.addToCart(id).subscribe({
    next:(response)=>{
     this._CartService.noOfCartItems.next(response.numOfCartItems) 
    
     
      this._ToastrService.success(response.message) 
    }
  })
}



favProducts:any[]=[]
favProductsCount:number=this.favProducts.length
addProductToWishList(id:string){
  if(this.favProducts.includes(id)){
    this.delete(id)
  }else{

    this._WishlistService.addProductToWishList(id).subscribe({
      next:(response)=>{
        this.favProducts=response.data
        this._ToastrService.success(response.message)
      }
    })
  }

}

delete(id:string){
  this._WishlistService.removefromwishlist(id).subscribe({
    next:(res)=>{
      let index = this.favProducts.indexOf(id)
      this.favProducts.splice(index,1)
      this._ToastrService.success(res.message)
    }
})

  
}

}
