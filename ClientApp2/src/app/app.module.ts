import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatListModule } from '@angular/material/list';
import { TrainingEditComponent } from './trainings/training-edit/training-edit.component';
import { TrainingAddComponent } from './trainings/training-add/training-add.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { TrainingComponent } from './trainings/training/training.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { EmployeeAddComponent } from './employees/employee-add/employee-add.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { LoginComponent } from './auth/login/login.component';
import { NewPasswordComponent } from './auth/new-password/new-password.component';
import { NewCodeComponent } from './auth/new-code/new-code.component';
import { environment } from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker'; 


import {MatAutocompleteModule} from '@angular/material/autocomplete'; 

import {MatStepperModule} from '@angular/material/stepper'; 
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { MatNativeDateModule } from '@angular/material/core';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { CardComponent } from './charts/card/card.component';
import { EmployeeFilterComponent } from './employees/employee-filter/employee-filter.component';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
  
    TrainingEditComponent,
    
    TrainingAddComponent,
    
    TrainingsComponent,
    TrainingComponent,
    EmployeesComponent,
    EmployeeEditComponent,
    EmployeeAddComponent,
    EmployeeComponent,
    LoginComponent,
    NewPasswordComponent,
   
    NewCodeComponent,
   
    MainComponent,
   
    DashboardComponent,
   
    CardComponent,
   
    EmployeeFilterComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, 
    AngularFireAuthModule,
    ReactiveFormsModule,
    AngularFireMessagingModule,
    BrowserModule,
    MatAutocompleteModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatStepperModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatGridListModule,
    MatMenuModule,
    
  ],
  providers: [   MatDatepickerModule,
    MatNativeDateModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
