import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent {
constructor(private _AuthService:AuthService , private _Router:Router){}


getEmail:FormGroup = new FormGroup({
  email:new FormControl('',[Validators.required,Validators.email])
 
})

get email():any{
  return this.getEmail.get('email')
}

handleForm(email:string){
this._AuthService.passRecover(email).subscribe({
  next:(res)=>{console.log(res);
    if(res.statusMsg == 'success'){this._Router.navigate(['/codereset'])}
    
  },
  error:(err)=>{console.log(err);

  }
})



}

}

