import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/shared/spinner.service';
import { Employees } from '../Models/employeesListResp';
import { EmployeeService } from '../service/employee.service';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  isNoRecordFound: boolean = false;
  EmployeeListSubscription: Subscription = null;
  EmployeeDeleteSubscription: Subscription = null;

  constructor(
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private spinnerService: SpinnerService,
  ) { }

  displayedColumns: string[] = ['id', 'employee_name', 'Actions'];
  paidDataSource: MatTableDataSource<Employees> = new MatTableDataSource();

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(){
    this.spinnerService.setSpinnerVisibility(true);
    this.EmployeeListSubscription = this.employeeService.getAllEmployees().subscribe((res:any)=>{
      this.spinnerService.setSpinnerVisibility(false);
      if(res.status){
        if(res.data.length == 0){
          this.isNoRecordFound = true;
        } else {
          this.isNoRecordFound = false;
        }
        this.paidDataSource = res.data;
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

  addEmployee() {
    this.openEmployeeDialog("create", 0);
  }

  editEmployee(employeeId: number) {
    this.openEmployeeDialog("update", employeeId);
  }

  openEmployeeDialog(action: string, id: number): void {
    const dialogRef = this.dialog.open(CreateEmployeeComponent, {
      width: "450px",
      disableClose: true,
      data: {
        action: action,
        id: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.isNeedToReload) {
        this.getAllEmployees();
      }
    });
  }

  deleteEmployee(employeeId: number){
    this.spinnerService.setSpinnerVisibility(true);
   this.EmployeeDeleteSubscription = this.employeeService.deleteEmployee(employeeId).subscribe(res=>{
      this.spinnerService.setSpinnerVisibility(false);
      if(res.status){
        this.snackBar.open(res.message, '',{
          duration: 2000,
          horizontalPosition: 'end',
          panelClass: ['mat-toolbar', 'mat-primary']
        });
        this.getAllEmployees();
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

  viewEmployeeDetails(employeeId: number){
    this.router.navigate([`dashboard/employeeDetail/${employeeId}`])
  }

  ngOnDestroy(){
    if(this.EmployeeListSubscription){
      this.EmployeeListSubscription.unsubscribe();
    }
    if(this.EmployeeDeleteSubscription){
      this.EmployeeDeleteSubscription.unsubscribe();
    }
  }

}
