import { NotExpr } from '@angular/compiler';
import { CartService } from './../../shared/service/cart.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit {

  constructor(private _AuthService:AuthService,private _CartService:CartService){}
  noOfCartItems:number=0
  ngOnInit(): void {
    

    this._CartService.noOfCartItems.subscribe({
      next:(data)=>{
        this.noOfCartItems=data
      
      
        
      }
    })

    this._CartService.getUserCart().subscribe({
      next:(response)=>{
        this.noOfCartItems=response.numOfCartItems
        
      }
    })
  }
  


  logOutUser(){
this._AuthService.logOut()



}
}
