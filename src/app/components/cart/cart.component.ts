import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  constructor(private _CartService:CartService){}

  cartDetails:any={}
  cartItems:number=0;
  loaded:boolean=false

  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next:(response)=>{
        this.cartDetails=response.data
        this.cartItems= response.numOfCartItems
        this.loaded=true

      },
      error:(err)=>{
        this.loaded=true
       
      } 
     })
   
  }

delete(productId:string){
  this._CartService.deleteProduct(productId).subscribe({
    next:(response)=>{
      this.cartDetails=response.data
      console.log(this.cartDetails);
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}


changeCount(productId:string,count:number){
  this._CartService.changeCount(productId,count).subscribe({
      next:(response)=>{
        this.cartDetails=response.data
      },
      error:(err)=>{console.log(err);}
  })
}

clearCart(){
  this._CartService.clearCart().subscribe({
    next:()=>{
      this.cartDetails={}
    }
  })

}
}