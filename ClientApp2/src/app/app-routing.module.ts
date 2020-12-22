import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingsComponent } from './trainings/trainings.component';
import { TrainingEditComponent } from './trainings/training-edit/training-edit.component';
import { LoginComponent } from './auth/login/login.component';
import { NewCodeComponent } from './auth/new-code/new-code.component';
import { NewPasswordComponent } from './auth/new-password/new-password.component';
import { TrainingAddComponent } from './trainings/training-add/training-add.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { MainComponent } from './main/main.component';

import { EmployeeAddComponent } from './employees/employee-add/employee-add.component';
import { canActivate } from '@angular/fire/auth-guard';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeProfileComponent } from './employees/employee-profile/employee-profile.component';
import { TrainingChartComponent } from './charts/training-chart/training-chart.component';
import { TrainingEmployeesComponent } from './trainings/training-employees/training-employees.component';
import { EmployeeTrainingsComponent } from './employees/employee-trainings/employee-trainings.component';
import { ChartsGeneralComponent } from './charts-general/charts-general.component';
import { LoggerComponent } from './logger/logger.component';
import { MessagesComponent } from './messages/messages.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { SpendingsComponent } from './spendings/spendings.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'requestnewpassword',component:NewCodeComponent},
  {path:'newpassword',component:NewPasswordComponent},
  {path:'',component:MainComponent,children:[
  {path:'training/add',component:TrainingAddComponent},
  {path:'training/:id/employees',component:TrainingEmployeesComponent},
  {path:'training/:id',component:TrainingEditComponent},
  {path:'trainings',component:TrainingsComponent,pathMatch:'full', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  {path:'employee/:id/trainings',component:EmployeeTrainingsComponent},
  {path:'trainings',component:TrainingsComponent},
  {path:':id/profile',component:EmployeeComponent},
  {path:'employees',component:EmployeesComponent},
  {path:'employee/add',component:EmployeeAddComponent},
  {path:'employee/:id',component:EmployeeEditComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'events',component:LoggerComponent},
  {path:'',component:DashboardComponent},
  {path:'inbox',component:MessagesComponent},
  {path:'reviews',component:ReviewsComponent},
  {path:'raports', component:ChartsGeneralComponent },
  {path:'spendings',component:SpendingsComponent}
]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
