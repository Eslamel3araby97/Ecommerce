import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Etoken } from 'src/app/shared/interfaces/etoken';
import { CartService } from 'src/app/shared/service/cart.service';
@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit {
  constructor(private _CartService:CartService){}
  userID:any
  userData:Etoken={} as Etoken ;
  loaded:boolean=false

  allorders:any=[]
  ngOnInit(): void {

    this.userID = localStorage.getItem('etoken')
    let decodeToken = jwtDecode(this.userID)
    console.log(decodeToken); 
    this.userData = decodeToken as Etoken
    console.log(this.userData.id);
    this.loaded=true


    this._CartService.getOrders(this.userData.id).subscribe({
      next:(response)=>{console.log(response);
        this.allorders=response
      }
    })

    
    
    
    
    
    

  }

  

}
