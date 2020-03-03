import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router, NavigationExtras } from '@angular/router';
import { Data } from 'src/app/services/data.service';
import { EmployeeHoursDetails } from 'src/app/models/EmployeeHoursDetails';
import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'app-update-hour-detail',
  templateUrl: './update-hour-detail.component.html',
  styles: []
})
export class UpdateHourDetailComponent implements OnInit {

  employeesHoursDetails: any[] = [];
  empHourDetails: EmployeeHoursDetails;
  titleModalDate: string;
  startDate: string;
  endDate: string;
  fullName: string;
  data: any;
  tpStartTime: string;

  constructor(private employee: EmployeeService,
              private router: Router,
              private dataShare: Data) {

    this.startDate = this.dataShare.storage.startDate;
    this.endDate = this.dataShare.storage.endDate;
    this.fullName = this.dataShare.storage.fullName;

    console.log('Titulo Hour Detail --> ' + this.dataShare.storage.id_hour);

    this.data = {
      id_hour: this.dataShare.storage.id_hour,
      id_emp: this.dataShare.storage.id_emp
    };

    console.log(this.data);

    this.employee.getEmployeeHoursDetailsById(this.data).subscribe( (data: any) => {
      this.employeesHoursDetails = data.data;
      console.log(data);
    });
  }

  ngOnInit() {

    this.empHourDetails = new EmployeeHoursDetails();
    this.tpStartTime = '7:00 AM';

    $( () => {
      console.log('##### INIT #####');
      // Timepicker Horario Regular Entrada
      $('#timepicker1').timepicker({
        showInputs: false,
        defaultTime: this.tpStartTime
      // }).on('changeTime.timepicker', function(e) {
      }).on('changeTime.timepicker', (e) => {
        console.log('CHANGE TIME');
        this.empHourDetails.start_regular_time = e.time.value;
      });

      // Timepicker Horario Regular Salida
      $('#timepicker2').timepicker({
        showInputs: false
      }).on('changeTime.timepicker', (e) => {
        this.empHourDetails.end_regular_time = e.time.value;
      });

      // Timepicker Horario Extraordinario Entrada
      $('#timepicker3').timepicker({
        showInputs: false
      }).on('changeTime.timepicker', (e) => {
        this.empHourDetails.start_over_time = e.time.value;
      });

      // Timepicker Horario Extraordinario Salida
      $('#timepicker4').timepicker({
        showInputs: false
      }).on('changeTime.timepicker', (e) => {
        this.empHourDetails.end_over_time = e.time.value;
      });
    });

  }

  onClick(employee) {
    console.log('ONCLICK');
    console.log(employee);

    // Set default time to 7:00 AM
    // $('#timepicker1').timepicker('setTime', this.tpStartTime);

    this.titleModalDate = employee.id_date;
    this.empHourDetails = employee;

    this.empHourDetails.start_regular_time = (employee.start_regular_time == null ? this.tpStartTime : employee.start_regular_time);
  }

  btnCancel() {
    this.dataShare.storage = {
      id: this.dataShare.storage.id_hour,
      id_emp: this.dataShare.storage.id_emp,
      startDate: this.dataShare.storage.startDate,
      endDate : this.dataShare.storage.endDate
    };
    this.router.navigate(['/hour/update-hour']);
  }
}
