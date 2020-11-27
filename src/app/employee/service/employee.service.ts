import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeListResponse } from '../Models/employeesListResp';
import { EmployeeDetailResponse } from '../Models/employeeDetailResp';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAllEmployees(){
    return this.http.get<EmployeeListResponse>(`http://dummy.restapiexample.com/api/v1/employees`);
  }

  createEmployee(body:any){
    return this.http.post<any>(`http://dummy.restapiexample.com/api/v1/create`, body);
  }

  deleteEmployee(employeeId: number) {
    return this.http.delete<any>(`http://dummy.restapiexample.com/api/v1/delete/${employeeId}`);
  }

  getEmployeeDetailsById(employeeId: number) {
    return this.http.get<EmployeeDetailResponse>(`http://dummy.restapiexample.com/api/v1/employee/${employeeId}`);
  }

  updateEmployee(employeeId: number , body:any) {
    return this.http.put<any>(`http://dummy.restapiexample.com/api/v1/update/${employeeId}`, body);
  }
}
