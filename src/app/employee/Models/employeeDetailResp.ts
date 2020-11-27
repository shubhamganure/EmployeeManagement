export interface EmployeeDetailResponse{
  message: string;
  status: string;
  data: EmployeeData[]
}

export interface EmployeeData{
  employee_age: number;
  employee_name: string;
  employee_salary: number;
  id: number;
  profile_image: string;
}
