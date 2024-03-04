import { group } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}

  customValidation =(group:AbstractControl)=>{
    const password = group.get('password')?.value
    const rePassword = group.get('rePassword')?.value
    if(password !== rePassword && rePassword !== null){
      group.get('rePassword')?.setErrors({notMatch:true})
    }else if(rePassword == null || rePassword == ''){
      group.get('rePassword')?.setErrors({required:true})
    }
   }

  registerFrom:FormGroup = new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    rePassword:new FormControl(null),
    phone:new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{0,8}/)]),
    
  },{validators:this.customValidation} as FormControlOptions)

 
  errorMsg:string=''
  isloading:boolean = false

  handleform(){

    if(this.registerFrom.valid == true){
      this.isloading = true
      this._AuthService.setRegister(this.registerFrom.value).subscribe({
        next:(res)=>{
          this._Router.navigate(['/login'])
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
    }else{
      this.registerFrom.markAllAsTouched()
    }
  }



  get name():any{
    return this.registerFrom.get('name')
  }

  get phone():any{
    return this.registerFrom.get('phone')
  }


  get email():any{
    return this.registerFrom.get('email')
  }


  get password():any{
    return this.registerFrom.get('password')
  }


  get rePassword():any{
    return this.registerFrom.get('rePassword')
  }


}
