import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private auth:AuthService,private http:HttpClient) { }
  UserActivated:boolean;
  EmailForm=  this.fb.group({
    email:['',[Validators.email,Validators.required]],
  });
  PasswordForm=this.fb.group({
    password:['',[Validators.required,Validators.minLength(8)]]
  });
  NewPassword=this.fb.group({
    Code:[''],
    Password:['']
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
      } 
      else   this.UserActivated=false;
      
    }
      )
  }
  RequestCode(){
    this.auth.RequestCode(this.email.value);
  }
  GetNewPassword(){
    this.auth.NewPassword(this.email.value,this.codePassword.value,this.code.value)
  }
Login(){
  this.auth.signIn(this.email.value,this.password.value);
}
  ngOnInit(): void {
  }

}
