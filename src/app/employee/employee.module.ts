import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeesComponent } from './employees/employees.component';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EmployeesComponent, CreateEmployeeComponent, EmployeeDetailsComponent, EmployeeDashboardComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class EmployeeModule { }

