import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  {
    path: "",
    component: EmployeeDashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'employees'
      },
      {
        path: 'employees',
        component: EmployeesComponent
      },
      {
        path: 'employeeDetail/:employeeId',
        component: EmployeeDetailsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
