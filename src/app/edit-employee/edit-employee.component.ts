import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employeeForm = new FormGroup({
    name: new FormControl(),
    office: new FormControl(),
    country: new FormControl(),
    salary: new FormControl(),
  });

  selectedEmployee: Employee = {
    _id: '',
    name: '',
    office: '',
    country: '',
    salary: 0
  };


  id;
  constructor(private route: ActivatedRoute ,public empService: EmployeeService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      
    });
    this.empService.getEmployeeById(this.id).subscribe(res => {
      this.selectedEmployee = res as Employee;
      const emp = res as Employee;
      console.log(emp);
      
    })
  }

  onSubmit(form: FormGroup) {
    if(form.valid) {

      console.log(this.selectedEmployee.name);
      
      this.empService.updateEmployees(form.value, this.id)
      .subscribe(res => {
        window.alert('Data saved successfully');
        
      });
      this.employeeForm.reset();
      window.location.replace('http://localhost:4200');
    } else {
      window.alert('Please enter all details.');
    }
    
  }

}
