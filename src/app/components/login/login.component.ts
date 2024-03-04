import { group } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  constructor(private _AuthService:AuthService , private _Router:Router){}

  loginForm:FormGroup = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),

  })

  errorMsg:string=''
  isloading:boolean = false

  handleform(){

    if(this.loginForm.valid == true){
      this.isloading = true
      this._AuthService.setLogin(this.loginForm.value).subscribe({
        next:(res)=>{
          localStorage.setItem('etoken',res.token)
          this._AuthService.saveUserData();
        
          
          this._Router.navigate(['/home'])
          this.isloading = false
        },
        error:(err:HttpErrorResponse)=>{
          if(err.error.message == 'fail'){
            this.errorMsg = err.error.errors.msg
            
          }else{
            this.errorMsg = err.error.message
          }
          this.isloading = false  
        }
       })
    }
  }

customValidation = (group:any)=>{
 const password = group.get('password')?.value
 const rePasswrod = group.get('rePasswrod')?.value
 if( password != rePasswrod){
  rePasswrod.setError({
    notMatch:true
  })
  
 }
}

  get name():any{
    return this.loginForm.get('name')
  }

  get phone():any{
    return this.loginForm.get('phone')
  }


  get email():any{
    return this.loginForm.get('email')
  }


  get password():any{
    return this.loginForm.get('password')
  }


  get rePassword():any{
    return this.loginForm.get('rePassword')
  }


}
