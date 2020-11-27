import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/shared/spinner.service';
import { EmployeeData } from '../../Models/employeeDetailResp';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  employeeFormGroup: FormGroup;
  dialogTitle: string = "Create Employee";
  employeeData:EmployeeData;

  EmployeeDetailSubscription: Subscription = null;
  EmployeeCreateSubscription: Subscription = null;
  EmployeeUpdateSubscription: Subscription = null;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateEmployeeComponent>,
    private employeeService: EmployeeService,
    private spinnerService: SpinnerService,
    @Inject(MAT_DIALOG_DATA) public dialogInjectedData: any
  ) { }

  ngOnInit(): void {
    if (this.dialogInjectedData.action == "update") {
      this.dialogTitle = "Update Employee";
      this.getEmployeeData(this.dialogInjectedData.id);
    }
    this.createLoginFormGroup();
  }

  createLoginFormGroup() {
    this.employeeFormGroup = this.fb.group({
      id: ['', [Validators.required,Validators.pattern("^[1-9][0-9]*$")]],
      age: ['', [Validators.required,Validators.pattern("^[1-9][0-9]*$")]],
      name: ['', Validators.required],
      salary: ['', [Validators.required,Validators.pattern("^[1-9][0-9]*$")]],
    });
  }

  getEmployeeData(employeeId: number){
    this.spinnerService.setSpinnerVisibility(true);
   this.EmployeeDetailSubscription = this.employeeService.getEmployeeDetailsById(employeeId).subscribe((res:any)=>{
      this.spinnerService.setSpinnerVisibility(false);
      if(res.status){
        this.employeeData = res.data;
        this.setMenuDetails();
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

  setMenuDetails() {
    this.employeeFormGroup.controls["id"].setValue(this.employeeData.id);
    this.employeeFormGroup.controls["age"].setValue(this.employeeData.employee_age);
    this.employeeFormGroup.controls["name"].setValue(this.employeeData.employee_name);
    this.employeeFormGroup.controls["salary"].setValue(this.employeeData.employee_salary);
  }

  createEmployee(){
    if(this.employeeFormGroup.valid){
      let body = {
        "id": this.employeeFormGroup.get('id').value,
        "age": this.employeeFormGroup.get('age').value,
        "name": this.employeeFormGroup.get('name').value,
        "salary": this.employeeFormGroup.get('salary').value
      }
      this.spinnerService.setSpinnerVisibility(true);
     this.EmployeeCreateSubscription = this.employeeService.createEmployee(JSON.stringify(body)).subscribe(res=>{
        this.spinnerService.setSpinnerVisibility(false);
        if(res.status){
          console.log('CreateRes', res);
          this.snackBar.open(res.message, '',{
            duration: 2000,
            horizontalPosition: 'end',
            panelClass: ['mat-toolbar', 'mat-primary']
          });
          this.dialogRef.close({ isNeedToReload: true });
        }
      },
      error =>{
        this.spinnerService.setSpinnerVisibility(false);
        this.snackBar.open("Something went wrong..!!", '',{
          duration: 2000,
          horizontalPosition: 'end',
          panelClass: ['Employee', 'mat-warn']
        });
      })
    } else {
      this.employeeFormGroup.markAllAsTouched();
      this.snackBar.open("Please add proper field!", '',{
        duration: 2000,
        horizontalPosition: 'end',
        panelClass: ['Employee', 'mat-warn']
      });
    }
  }

  updateEmployee(){
    if(this.employeeFormGroup.valid){
      let employeeId = this.employeeFormGroup.get('id').value;
      let body = {
        "id": this.employeeFormGroup.get('id').value,
        "age": this.employeeFormGroup.get('age').value,
        "name": this.employeeFormGroup.get('name').value,
        "salary": this.employeeFormGroup.get('salary').value
      }
      this.spinnerService.setSpinnerVisibility(true);
     this.EmployeeUpdateSubscription = this.employeeService.updateEmployee(employeeId, JSON.stringify(body)).subscribe(res=>{
        this.spinnerService.setSpinnerVisibility(false);
        if(res.status){
          console.log('UpdateRes', res);
          this.snackBar.open(res.message, '',{
            duration: 2000,
            horizontalPosition: 'end',
            panelClass: ['mat-toolbar', 'mat-primary']
          });
          this.dialogRef.close({ isNeedToReload: true });
        }
      },
      error =>{
        this.spinnerService.setSpinnerVisibility(false);
        this.snackBar.open("Something went wrong..!!", '',{
          duration: 2000,
          horizontalPosition: 'end',
          panelClass: ['Employee', 'mat-warn']
        });
      })
    } else {
      this.employeeFormGroup.markAllAsTouched();
      this.snackBar.open("Please add proper field!", '',{
        duration: 2000,
        horizontalPosition: 'end',
        panelClass: ['Employee', 'mat-warn']
      });
    }

  }

  onCloseDialogClick() {
    this.dialogRef.close({ isNeedToReload: false });
  }

  ngOnDestroy(){
    if(this.EmployeeDetailSubscription){
      this.EmployeeDetailSubscription.unsubscribe();
    }
    if(this.EmployeeCreateSubscription){
      this.EmployeeCreateSubscription.unsubscribe();
    }
    if(this.EmployeeUpdateSubscription){
      this.EmployeeUpdateSubscription.unsubscribe();
    }
  }

}
