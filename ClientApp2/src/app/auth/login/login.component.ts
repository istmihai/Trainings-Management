import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, private http:HttpClient, private auth:AuthService,private router:Router,) { }
  UserActivated:boolean;
  hidden:boolean=false;
  hide=true;
  passwordValid=true;
  EmailForm=  this.fb.group({
    email:['',[Validators.email,Validators.required]],
  });
  PasswordForm=this.fb.group({
    password:['',[Validators.required,Validators.minLength(8)]]
  });
  NewPassword=this.fb.group({
    Code:['',[Validators.required]],
    Password:['',[Validators.required]],
    ConfirmPassword:['',[Validators.required]]
  });
  get email(){
    return this.EmailForm.get('email');
  }
   get  password(){
    return   this.PasswordForm.get('password');
  }
get code(){
    return this.NewPassword.get('Code');

}
get codePassword(){
  return this.NewPassword.get('Password');
}
  VerifyEmail(){
    this.http.get(`/api/verifyEmail?email=${this.email.value}`,{observe:'response',responseType:'text'},).
    subscribe(response=>{
      if(response.body==='Activated'){
        console.log(response.body);
        this.UserActivated=true;
        this.hidden=true;
      } 
      else  { this.UserActivated=false;
        this.hidden=true;
        console.log(this.UserActivated);
      }
    }
      )
  }
  RequestCode(){
    this.auth.RequestCode(this.email.value);
  }
  CodeError:boolean=false;
  GetNewPassword(){
    this.auth.NewPassword(this.email.value,this.codePassword.value,this.code.value).subscribe(data=>
     { if(data.status==200) this.router.navigate['login']; 
      else {this.CodeError=true
      console.log(this.CodeError)
      }
  });
}
Login(){
 this.auth.signIn(this.email.value,this.password.value).then(data=>this.passwordValid=data)
}
  ngOnInit(): void {
  }

}
