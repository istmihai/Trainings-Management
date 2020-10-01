import { Injectable, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Employee } from '../shared/employee.model';
import { map, switchMap } from 'rxjs/operators';
import { EmailValidator } from '@angular/forms';
import {Code } from './code'
import { User } from 'firebase';
import { promise } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    employee$:Observable<Employee | null>;
    role:Observable<boolean>;
  constructor(private auth:AngularFireAuth,private router:Router , private http:HttpClient,private db:AngularFirestore) { 
  //  auth.setPersistence('local').then(()=>
    this.employee$=this.auth.authState.pipe(
        switchMap(user=>{
          if(user){
            return this.db.doc<Employee>(`Employees/${user.uid}`).valueChanges().pipe(map (x=>{
              let aux = x;
              aux.Id = user.uid;
              return aux;
            }));
          }else{
            return of(null);
          }
          
        }
        )
      )//)
     this.role=this.auth.authState.pipe(
        switchMap(user=>
          user.getIdTokenResult().then(
              token=>{
                if(token.claims.Admin){
                  return true;
                }
                else return false;
              }
              
          )
        )
      )

  }

 async signOut(){
   await this.auth.signOut().then(()=>{
     localStorage.removeItem('user');
   localStorage.clear();
   this.router.navigate(['/login'])});
   
  }
 async signIn(email:string,password:string): Promise<boolean> {
    
   return this.auth.signInWithEmailAndPassword(email,password).then(()=>{
      this.auth.currentUser.then(user=>{
        user.getIdToken().then(
          token=>{this.http.post(`/api/login?request=${token}`,'').subscribe()
          console.log(token)})
    })
      this.router.navigate(['/'])
      return true;
    }
    ).catch(function(error){
        return false;
    })
    
  }
  RequestCode(email:string){
    var req={email:email};
    var x = "api/requestnewpassword?email="+email;
     this.http.post(x,req).subscribe((res)=>{
       this.router.navigate(['newpassword']);
     })
  }
  NewPassword(Email:string,Password:string,recode:string){
    const ReqCode:Code={
      password :Password,
      code:recode,
      email:Email
    }
      
    
   return  this.http.post<Code>(`api/newpassword`,ReqCode,{observe:'response'});
}
}