import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Employee } from 'src/app/shared/employee.model';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  Admin:boolean=false;
  Employee$:Observable<Employee>;
  profileUrl;
  id :string;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private auth:AuthService,private store: AngularFireStorage) {
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
      }
      )
   this.Employee$=this.auth.employee$;
  }
  signOut(){
    this.auth.signOut();
  }
}
