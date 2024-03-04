import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, takeLast } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient){}

noOfCartItems:BehaviorSubject<number>= new BehaviorSubject(0);


headers:any={token:localStorage.getItem('etoken')}

addToCart(ProductId:string):Observable<any>{
  return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart',
{"productId": ProductId},
  {
    headers: this.headers
  } 
)
}

getUserCart():Observable<any>{
return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`,
{
  headers:this.headers
}
)
}

deleteProduct(id:string):Observable<any>{
return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
{
  headers:this.headers
})
}

changeCount(id:string,count:number):Observable<any>{
  count.toString()
  return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
{"count": count},
{headers:this.headers}
)
}

clearCart():Observable<any>{
  return this._HttpClient.delete('https://ecommerce.routemisr.com/api/v1/cart',
  {
    headers:this.headers
  })
}

checkOut(cartId:string,userData:object):Observable<any>{
  return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
  {
    shippingAddress:userData
  },
  {
    headers:this.headers
  })
}

getOrders(userID:string):Observable<any>{
  return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`)

}
}
