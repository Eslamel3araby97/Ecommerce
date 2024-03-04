import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient,private _Router:Router) {}



  logOut():void{
      localStorage.removeItem('etoken')
      this._Router.navigate(['/login'])
      
      
    }

    setRegister( userData:object ):Observable<any>
    {
      return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signup", userData)
    }

    setLogin( userData:object ):Observable<any>
    {
      return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signin", userData)
    }

    userData:any;
    saveUserData(){
      if (localStorage.getItem('etoken')!= null){
        let encodeToken:any = localStorage.getItem('etoken');
        let decodeToken = jwtDecode(encodeToken)
        this.userData= decodeToken;
        console.log(decodeToken);
        
      }
    }


    // https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords
    passRecover( email:string ):Observable<any>
    {
      return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      {
        "email":email
      })
    }
    // https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode
    resetCode( code:string ):Observable<any>
    {
      return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      {
        "resetCode":code
      })
    }
    

}
