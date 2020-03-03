import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Hours } from 'src/app/models/Hours';

declare var $: any;

@Component({
  selector: 'app-add-hour',
  templateUrl: './add-hour.component.html',
  styles: []
})
export class AddHourComponent implements OnInit {

  hours: Hours;

  constructor(private employee: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.hours = new Hours();

  // Date picker
    $( () => {
    $('#datepicker').datepicker({
      autoclose: true
    }).on('changeDate', function(e) {
      // console.log('changeDate event trigger');
      this.focus();
     });
  });

  // Date picker
    $( () => {
    $('#datepicker2').datepicker({
      autoclose: true
    }).on('changeDate', function(e) {
      // console.log('changeDate event trigger');
      this.focus();
     });
  });

  }

  addHour(hours: Hours) {
    console.log(hours);
    console.log('putCreateHour');
    this.employee.postCreateHour(hours).subscribe( (data) => {
      console.log('Horas Creadas...');
      // alert('Empleado creado con éxito');
      console.log(data);
      this.router.navigate(['hour']);
    });
  }

}
