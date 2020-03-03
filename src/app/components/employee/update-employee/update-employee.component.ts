import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/Employee';
import { Data } from 'src/app/services/data.service';

const moment = require('moment');

declare var $: any;

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styles: []
})
export class UpdateEmployeeComponent implements OnInit {

  empleado: Employee;
  idEmployee;
  listOcupations: any[] = [];
  options: any[] = [];
  optionsGenre: any[] = [];

  constructor(private employee: EmployeeService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private dataShare: Data) {
  this.listOcupations = [
    { id: 1, label: 'Ayudante'},
    { id: 2, label: 'Plomero'}
  ];

  this.options = [
    { id: 1, label: 'Sí'},
    { id: 0, label: 'No'}
  ];

  this.optionsGenre = [
    { id: 'M', label: 'Masculino'},
    { id: 'F', label: 'Femenino'}
  ];

  this.getEmployeeById(this.dataShare.storage);
  }


  getEmployeeById(id: any) {
    console.log('getEmployeeById');
    this.employee.getEmployeeById(id).subscribe( (data: any) => {
      this.empleado = data.data;
      if (this.empleado) {
        console.log(this.empleado);
      } else {
        console.log('Sin Data');
      }
    });
  }

  updateEmployee() {
    console.log('updateEmployee');
    console.log(this.empleado.birthday);
    this.empleado.birthday = moment(this.empleado.birthday).format('YYYY-MM-DD');
    console.log(this.empleado.birthday);
    this.employee.putUpdateEmployeeById(this.empleado).subscribe( (data: any) => {
        console.log('Empleado Actualizado...');
        this.router.navigate(['employee']);
      });
  }

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
}