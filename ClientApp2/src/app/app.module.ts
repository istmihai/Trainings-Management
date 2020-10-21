import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 


import {MatDividerModule} from '@angular/material/divider'; 

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


import {MatBadgeModule} from '@angular/material/badge'; 

import {DragDropModule} from '@angular/cdk/drag-drop'; 
import { AngularFireStorageModule } from '@angular/fire/storage';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {MatCheckboxModule} from '@angular/material/checkbox'


import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatStepperModule} from '@angular/material/stepper'; 
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { MatNativeDateModule, MatPseudoCheckboxModule } from '@angular/material/core';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { CardComponent } from './charts/card/card.component';
import { EmployeeFilterComponent } from './employees/employee-filter/employee-filter.component';
import { TrainingChartComponent } from './charts/training-chart/training-chart.component';
import { TrainingFilterComponent } from './trainings/training-filter/training-filter.component';
import { EmployeeProfileComponent } from './employees/employee-profile/employee-profile.component';
import { EmployeeChartComponent } from './charts/employee-chart/employee-chart.component';
import { TrainingEmployeesComponent } from './trainings/training-employees/training-employees.component';
import { EmployeeDialogComponent } from './trainings/employee-dialog/employee-dialog.component';
import { EmployeeSnackbarComponent } from './employees/employee-snackbar/employee-snackbar.component';
import { EmployeeDeleteComponent } from './employees/employee-delete/employee-delete.component';
import { TrainingDeleteComponent } from './trainings/training-delete/training-delete.component';
import { TrainingCardComponent } from './trainings/training-card/training-card.component';
import { EmployeeTrainingsComponent } from './employees/employee-trainings/employee-trainings.component';
import { EmployeeBarchartComponent } from './charts/employee-barchart/employee-barchart.component';
import { TrainingsInprogressComponent } from './charts/trainings-inprogress/trainings-inprogress.component';
import { EmployeeTrainingsFilterComponent } from './employees/employee-trainings-filter/employee-trainings-filter.component';
import { ChartsGeneralComponent } from './charts-general/charts-general.component';
import { LoggerComponent } from './logger/logger.component';
import { MessagesComponent } from './messages/messages.component';
import { IconPipePipe } from './logger/icon-pipe.pipe';

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
   
    EmployeeFilterComponent,
   
    TrainingChartComponent,
   
    TrainingFilterComponent,
   
    EmployeeProfileComponent,
   
    EmployeeChartComponent,
   
    TrainingEmployeesComponent,
   
    EmployeeDialogComponent,
   
    EmployeeSnackbarComponent,
   
    EmployeeDeleteComponent,
   
    TrainingDeleteComponent,
   
    TrainingCardComponent,
   
    EmployeeTrainingsComponent,
   
    EmployeeBarchartComponent,
   
    TrainingsInprogressComponent,
   
    EmployeeTrainingsFilterComponent,
   
    ChartsGeneralComponent,
   
    LoggerComponent,
   
    MessagesComponent,
   
   IconPipePipe
    
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, 
    AngularFireAuthModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    AngularFireMessagingModule,
    BrowserModule,
    MatDividerModule,
    MatBadgeModule,
    NgxChartsModule,
    DragDropModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    LayoutModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatStepperModule,
    MatButtonModule,
    MatDialogModule,
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
    MatProgressSpinnerModule,
    MatMenuModule,
    
  ],
  providers: [   MatDatepickerModule,
    MatNativeDateModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
