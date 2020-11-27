import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createLoginFormGroup();
  }

  createLoginFormGroup() {
    this.loginFormGroup = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  authenticateUser() {
    if(this.loginFormGroup.valid){
      if(this.loginFormGroup.get('userId').value == "1234" &&
      this.loginFormGroup.get('password').value == "user1234" ){
        this.snackBar.open("User logged in Successfully!", '',{
          duration: 2000,
          horizontalPosition: 'end',
          panelClass: ['mat-toolbar', 'mat-primary']
        });
        this.router.navigate(['dashboard']);
      } else {
        this.snackBar.open("Credentials Invalid!", '',{
          duration: 2000,
          horizontalPosition: 'end',
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      }
    } else {
      this.loginFormGroup.markAllAsTouched();
    }
  }

}
