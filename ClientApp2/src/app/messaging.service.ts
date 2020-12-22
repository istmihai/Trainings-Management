import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(private msg:AngularFireMessaging ,private http:HttpClient, private db:AngularFirestore) { }

  requestPermission(employeeId:string) {
    this.msg.requestToken
      .subscribe(
        (token) => { 
            this.http.post(`/api/employee/fcmtoken?employeeId=${employeeId}&fcmToken=${token}`,'').subscribe();
         },
        (error) => { console.error(error); },  
      );
  }

  deleteToken() {
    this.msg.getToken
      .pipe(mergeMap(token => this.msg.deleteToken(token)))
      .subscribe(
        (token) => { console.log('Token deleted!'); },
      );
  }


}

