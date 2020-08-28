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
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'requestnewpassword',component:NewCodeComponent},
  {path:'newpassword',component:NewPasswordComponent},
  {path:'',component:MainComponent,children:[
  {path:'trainings/edit',component:TrainingEditComponent},
  {path:'trainings',component:TrainingsComponent,pathMatch:'full',data:[redirectUnauthorizedToLogin],},

  {path:'trainings',component:TrainingsComponent},
  {path:'training/add',component:TrainingAddComponent},
  {path:'home',component:EmployeeComponent},
  {path:'employees',component:EmployeesComponent},
  {path:'employee/add',component:EmployeeAddComponent},
  {path:'employee/edit',component:EmployeeEditComponent}
] ,canActivate:[AngularFireAuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
