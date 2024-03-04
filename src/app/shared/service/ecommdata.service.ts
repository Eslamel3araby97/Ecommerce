import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcommdataService {
// https://route-ecommerce.onrender.com//api/v1/subcategories
headers:any={token:localStorage.getItem('etoken')}

  constructor(private _HttpClient:HttpClient) {}

    getProducts():Observable<any>{
      return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products')
    }

    getSpecificProduct(id:string):Observable<any>{
      return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    getProductDetails(productid:string):Observable<any>{
      return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${productid}`)
    }

    getAllCategories():Observable<any>{
      return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }

    getAllBrands():Observable<any>{
      return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    }

}
