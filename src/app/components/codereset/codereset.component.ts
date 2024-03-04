import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-codereset',
  templateUrl: './codereset.component.html',
  styleUrls: ['./codereset.component.scss']
})
export class CoderesetComponent {
  constructor(private _AuthService:AuthService , private _Router:Router){}


  getCode:FormGroup = new FormGroup({
    code:new FormControl('')
   
  })
  
  get code():any{
    return this.getCode.get('code')
  }
  
  handleForm(code:string){
  this._AuthService.resetCode(code).subscribe({
    next:(res)=>{console.log(res);
      // this._Router.navigate(['/codeReset'])
    },
    error:(err)=>{console.log(err);
  
    }
  })
  
  
  
  }
  
}
