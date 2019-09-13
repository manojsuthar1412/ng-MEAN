import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  readonly url = 'http://localhost:3000/employees';
  employees: Employee[];
  selectedEmployee: Employee;
  constructor(private http: HttpClient) { 
  }

  getEmployees() {
    return this.http.get(this.url);
  }

  postEmployee(emp: Employee) {
    return this.http.post(this.url, emp);
  }

  deleteEmployees(id: any) {
    const url = this.url+'/'+id; 
    return this.http.delete(url);
  }

  updateEmployees(emp: Employee ,id: any) {
    const url = this.url+'/'+id;
    return this.http.put(url, emp);
  }

  getEmployeeById(id: any) {
    const url = this.url+'/'+id;
    return this.http.get(url);
  }
}
