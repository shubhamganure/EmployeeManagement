export interface EmployeeListResponse {
  status: string;
  data: Employees[]
}

export interface Employees {
  employee_age: string;
  employee_name: string;
  employee_salary: string;
  id: string;
  profile_image: string;
}
