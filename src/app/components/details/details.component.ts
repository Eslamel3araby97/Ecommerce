import { Product } from 'src/app/shared/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcommdataService } from 'src/app/shared/service/ecommdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/service/cart.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
constructor(private _ActivatedRoute:ActivatedRoute, private _EcommdataService:EcommdataService,private _CartService:CartService){}

ProductDetails: OwlOptions = {
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

images:any[]=[]
productDetails:Product={} as Product;

ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(parameter)=>{
    let productID:any= parameter.get('id')
    this._EcommdataService.getProductDetails(productID).subscribe({
      next:(response)=>{
        console.log(response.data);
        
        this.productDetails=response.data
        this.images=response.data.images
      }
    })
    }
  })
}

addToCart(id:string){
  this._CartService.addToCart(id).subscribe({
    next:(response)=>{console.log(response);
    }
  })
}
}
