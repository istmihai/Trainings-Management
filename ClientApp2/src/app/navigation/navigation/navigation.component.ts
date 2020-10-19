import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, count, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Employee } from 'src/app/shared/employee.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  Admin:boolean=false;
  Employee$:Observable<Employee>;
  profileUrl;
  test=5;
  inboxUnread;
  id :string;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private auth:AuthService,private db:AngularFirestore, private store: AngularFireStorage) {
    this.auth.role.subscribe(data=>{
      this.Admin=data;
      
      console.log(data);
    })    
    this.auth.employee$.subscribe(data=>
      {
        this.id=data.Id;
        const filePath=`Employees/${data.Id}/${data.PhotoUrl}`;
        const ref =this.store.ref(filePath);
        this.profileUrl=  ref.getDownloadURL();
        this.db.collection(`Employees/${data.Id}/Messages`,ref=>ref.where('unread','==',true)).valueChanges().subscribe(data=>this.inboxUnread=data.length) ;

   
    }
      )
   this.Employee$=this.auth.employee$;
  }
  ngOnInit(): void {
    this.Employee$.subscribe(employee=>{
  this.db.collection(`Employees/${employee.Id}/Messages`,ref=>ref.where('unread','==',true)).valueChanges().subscribe(data=>this.inboxUnread=data.length) });
    
  }
  
  signOut(){
    this.auth.signOut();
  }
  isHidden(){
    if(this.inboxUnread>0) return false;
    return true;
  }
}
