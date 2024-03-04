import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';
import { EcommdataService } from 'src/app/shared/service/ecommdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  constructor(
    private _EcommdataService:EcommdataService,private _CartService:CartService,private _ToastrService: ToastrService ,){}
 
    brands:any=[]

    ngOnInit(): void {
  
      this._EcommdataService.getAllBrands().subscribe({
        next:(Response)=>{
          
          this.brands = Response.data
          
          
        }
      })
    }

  
}
