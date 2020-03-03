import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/Employee';

declare var $: any;

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styles: []
})
export class AddEmployeeComponent implements OnInit {

  empleado: Employee;

  constructor(private employee: EmployeeService, private router: Router) { }

  ngOnInit() {
     this.empleado = new Employee();

     // Date picker
     $( () => {
      $('#datepicker').datepicker({
        autoclose: true
      }).on('changeDate', function(e) {
        // console.log('changeDate event trigger');
        this.focus();
       });
    });
  }

  addEmployee(empleado: Employee) {
    console.log(empleado);
    console.log('putCreateEmployee');
    this.employee.postCreateEmployee(empleado).subscribe( (data) => {
      console.log('Empleado Creado...');
      // alert('Empleado creado con éxito');
      console.log(data);
      this.router.navigate(['employee']);
    });
  }

}
