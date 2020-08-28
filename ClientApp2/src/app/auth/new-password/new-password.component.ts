import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  constructor(private http:HttpClient, private fb:FormBuilder,private auth:AuthService) { }
  NewPasswordForm=this.fb.group({
    Email:[''],
    Code:[''],
    Password:['']
  });
  ngOnInit(): void {
  }
 onSubmit(){
  
   this.auth.NewPassword(this.NewPasswordForm.get('Email').value,this.NewPasswordForm.get('Password').value,this.NewPasswordForm.get('Code').value)
 }

}
