import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EmployeeData } from '../../Models/employeeDetailResp';
import { EmployeeService } from '../../service/employee.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/shared/spinner.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  employeeData:EmployeeData;
  employeeId: number;

  EmployeeDetailSubscription:Subscription = null;

  constructor(
    private routes: ActivatedRoute,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private location: Location,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    this.employeeId = this.routes.snapshot.params['employeeId'];
    this.getEmployeeData();
  }

  getEmployeeData(){
    this.spinnerService.setSpinnerVisibility(true);
    this.EmployeeDetailSubscription = this.employeeService.getEmployeeDetailsById(this.employeeId).subscribe((res:any)=>{
    this.spinnerService.setSpinnerVisibility(false);
    if(res.status){
        this.employeeData = res.data;
      } else {
        this.snackBar.open("No data found!!", '',{
          duration: 2000,
          horizontalPosition: 'end',
          panelClass: ['Employee', 'mat-warn']
        });
      }
    },
    error =>{
      this.spinnerService.setSpinnerVisibility(false);
      this.snackBar.open("Something went wrong..!!", '',{
        duration: 2000,
        horizontalPosition: 'end',
        panelClass: ['Employee', 'mat-warn']
      });
    }
    )
  }

  goBackToList(){
    this.location.back();
  }

  ngOnDestroy(){
    if(this.EmployeeDetailSubscription){
      this.EmployeeDetailSubscription.unsubscribe();
    }
  }

}
