import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
// import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  
  employeeForm = new FormGroup({
    name: new FormControl(),
    office: new FormControl(),
    country: new FormControl(),
    salary: new FormControl()
  });
  
  selectedEmployee: Employee = {
    _id : null,
    name: null,
    country: null,
    office: null,
    salary: null
  };
  
  constructor(public empService: EmployeeService, private fb: FormBuilder ) {
    // this.selectedEmployee = this.empService.selectedEmployee;
  }
  
  
  // employeeForm = this.fb.group({
  //   name: ['', Validators.required],
  //   office: ['', Validators.required],
  //   country: ['', Validators.required],
  //   salary: ['', Validators.required]
  // });
  
  ngOnInit() {
      
      this.refreshEmployeeList();
      // this.employeeForm = this.fb.group({
      //   name: ['', Validators.required],
      //   office: [''],
      //   country: [''],
      //   salary: [''],
      // });    
    }
   get name() {
     return this.employeeForm.get('name').value;
   }
   get office() {
     return this.employeeForm.get('office').value;
   }
   get country() {
     return this.employeeForm.get('country').value;
   }
   get salary() {
     return this.employeeForm.get('salary').value;
   }

  refreshEmployeeList() {
    this.empService.getEmployees().subscribe((res) => {
      this.empService.employees = res as Employee[];      
    });
  }

  onDelete(id: any) {
    this.empService.deleteEmployees(id)
        .subscribe(() => { this.refreshEmployeeList() });
  }

  onSubmit(form: FormGroup) {
    if(form.valid) {

      this.empService.postEmployee(form.value).subscribe((res) => {
        this.refreshEmployeeList();
        window.alert('Data saved successfully');    
      });    
      this.employeeForm.reset();
    } else {
      window.alert('All fields are required.');
    }
    
  }


  onEdit(id: any) {
    

  }
  
  

 

}
