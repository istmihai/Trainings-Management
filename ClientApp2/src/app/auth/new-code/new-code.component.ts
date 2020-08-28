import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-new-code',
  templateUrl: './new-code.component.html',
  styleUrls: ['./new-code.component.css']
})
export class NewCodeComponent implements OnInit {
  constructor(private fb: FormBuilder,private http:HttpClient,private auth:AuthService) { }
  ReqPass=  this.fb.group({
    email:['',[Validators.email,Validators.required]]});

  
  ngOnInit(): void {
  }
  get email(){
    return this.ReqPass.get('email');
  }
  ReqCode(){
   this.auth.RequestCode(this.email.value);
   }

}
