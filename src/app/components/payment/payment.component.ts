import { CartService } from 'src/app/shared/service/cart.service';
import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{
constructor(private _FormBuilder:FormBuilder, private _ActivatedRoute:ActivatedRoute,private _CartService:CartService){}
checkOut:FormGroup = this._FormBuilder.group({
  details :[null,[Validators.required]],
  phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{0,8}/)]],
  city:[null,[Validators.required]]  
})

 cartID:any=''
 
ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        console.log(params.get('id'));
        this.cartID=params.get('id');
        
      }
    })
}

userData:object=this.checkOut.value;

handleform(){
  this._CartService.checkOut(this.cartID,this.userData).subscribe({
    next:(response)=>{
      if(response.status == 'success'){
        window.open(response.session.url,'_self')
      }
    }
  })
}

get phone():any{
  return  this.checkOut.get('phone')
}

get city():any{
  return  this.checkOut.get('city')
}


}
