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
  eHourDetails: EmployeeHoursDetails;
  titleModalDate: string;
  startDate: string;
  endDate: string;
  fullName: string;
  data: any;
  tpStartTime: string;
  tpEndTime: string;
  tpStartXtraTime: string;
  tpEndXtraTime: string;

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

      this.employeesHoursDetails = this.employeesHoursDetails.map(x => {
        return {
          ...x,
          start_regular_time: x.start_regular_time === null ? null : moment(x.start_regular_time, 'HH:mm').format('h:mm A'),
          end_regular_time: x.end_regular_time === null ? null : moment(x.end_regular_time, 'HH:mm').format('h:mm A'),
          start_over_time: x.start_over_time === null ? null : moment(x.start_over_time, 'HH:mm').format('h:mm A'),
          end_over_time: x.end_over_time === null ? null : moment(x.end_over_time, 'HH:mm').format('h:mm A')
        };
      });

      console.log(data);
    });
  }

  // Store Data
  storeData() {
    this.dataShare.storage = {
      id: this.dataShare.storage.id_hour,
      id_emp: this.dataShare.storage.id_emp,
      startDate: this.dataShare.storage.startDate,
      endDate : this.dataShare.storage.endDate
    };
  }

  // Calculate hours worked
  workedHours(type: string) {
    if (type === 'R') {

      if (this.empHourDetails.start_regular_time !== null || this.empHourDetails.end_regular_time !== null) {
      // start time and end time
      const startTime = moment(this.empHourDetails.start_regular_time, 'HH:mm:ss a');
      const endTime = moment(this.empHourDetails.end_regular_time, 'HH:mm:ss a');

      const hours = endTime.diff(startTime, 'hours');
      const minutes = moment.utc(moment(endTime, 'HH:mm:ss').diff(moment(startTime, 'HH:mm:ss'))).format('mm');

      this.empHourDetails.total_regular_time = Number((hours + Number(minutes) / 60).toFixed(2));
      console.log(this.empHourDetails.total_regular_time);
      }

    } else {

      if (this.empHourDetails.start_regular_time !== null || this.empHourDetails.end_regular_time !== null) {

        // start time and end time
        const startOverTime = moment(this.empHourDetails.start_over_time, 'HH:mm:ss a');
        const endOverTime = moment(this.empHourDetails.end_over_time, 'HH:mm:ss a');

        const hoursOver = endOverTime.diff(startOverTime, 'hours');
        const minutesOver = moment.utc(moment(endOverTime, 'HH:mm:ss').diff(moment(startOverTime, 'HH:mm:ss'))).format('mm');

        this.empHourDetails.total_over_time = Number((hoursOver + Number(minutesOver) / 60).toFixed(2));
        console.log(this.empHourDetails.total_over_time);
      }
    }
  }

  ngOnInit() {

    this.empHourDetails = new EmployeeHoursDetails();
    this.tpStartTime = '7:00 AM';
    this.tpEndTime = '3:00 PM';
    this.tpStartXtraTime = '3:00 PM';
    this.tpEndXtraTime = '3:00 PM';

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
        this.workedHours('R');
      });

      // Timepicker Horario Regular Salida
      $('#timepicker2').timepicker({
        showInputs: false,
        defaultTime: this.tpStartTime
      }).on('changeTime.timepicker', (e) => {
        this.empHourDetails.end_regular_time = e.time.value;
        this.workedHours('R');
      });

      // Timepicker Horario Extraordinario Entrada
      $('#timepicker3').timepicker({
        showInputs: false,
        defaultTime: this.tpStartXtraTime
      }).on('changeTime.timepicker', (e) => {
        this.empHourDetails.start_over_time = e.time.value;
        this.workedHours('O');
      });

      // Timepicker Horario Extraordinario Salida
      $('#timepicker4').timepicker({
        showInputs: false,
        defaultTime: this.tpEndXtraTime
      }).on('changeTime.timepicker', (e) => {
        this.empHourDetails.end_over_time = e.time.value;
        this.workedHours('O');
      });
    });

  }

  onClick(employee) {
    console.log('ONCLICK');
    console.log(employee);

    this.titleModalDate = employee.id_date;
    this.empHourDetails = employee;
    this.empHourDetails.start_regular_time = (employee.start_regular_time == null ? this.tpStartTime : employee.start_regular_time);
    this.empHourDetails.end_regular_time = (employee.end_regular_time == null ? this.tpEndTime : employee.end_regular_time);

    this.empHourDetails.start_over_time = (employee.start_over_time == null ? this.tpStartXtraTime : employee.start_over_time);
    this.empHourDetails.end_over_time = (employee.end_over_time == null ? this.tpEndXtraTime : employee.end_over_time);

    // Set default time to 7:00 AM or value Model empHourDetails.start_regular_time
    $('#timepicker1').timepicker('setTime', this.empHourDetails.start_regular_time);
    // Set default time to 3:00 PM or value Model empHourDetails.end_regular_time
    $('#timepicker2').timepicker('setTime', this.empHourDetails.end_regular_time);
    // Set default time to 3:00 PM or value Model empHourDetails.start_over_time
    $('#timepicker3').timepicker('setTime', this.empHourDetails.start_over_time);
    // Set default time to 5:00 PM or value Model empHourDetails.end_over_time
    $('#timepicker4').timepicker('setTime', this.empHourDetails.end_over_time);

    this.workedHours('R');
  }

  btnCancel() {
    this.storeData();
    this.router.navigate(['/hour/update-hour']);
  }

  btnGuardar() {
    console.log('btnGuardar');

    // items = items.map(x => (x.id === item.id) ? item : x)
    this.employeesHoursDetails = this.employeesHoursDetails.map(x => {
      return {
        ...x,
        start_regular_time: x.start_regular_time === null ? null : moment(x.start_regular_time, 'h:mm A').format('HH:mm'),
        end_regular_time: x.end_regular_time === null ? null : moment(x.end_regular_time, 'h:mm A').format('HH:mm'),
        start_over_time: x.start_over_time === null ? null : moment(x.start_over_time, 'h:mm A').format('HH:mm'),
        end_over_time: x.end_over_time === null ? null : moment(x.end_over_time, 'h:mm A').format('HH:mm')
      };
    });

    this.employee.putUpdateHoursDetails(this.employeesHoursDetails).subscribe( (data: any) => {
      console.log('Horas de Trabajo Actualizadas...');
      this.storeData();
      this.router.navigate(['hour/update-hour']);
    });

    console.log(this.employeesHoursDetails);
  }
}
