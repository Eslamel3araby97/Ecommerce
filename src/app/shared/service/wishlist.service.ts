import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient) { }
  
  headers:any={token:localStorage.getItem('etoken')}

  addProductToWishList(id:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    {productId:id},
    {
      headers:this.headers
    }
    )
  }

  getUserWishList():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    {
      headers:this.headers
    }
    )}

    removefromwishlist(id:string):Observable<any>{
      return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      {
        headers:this.headers
      }
      )}
}
