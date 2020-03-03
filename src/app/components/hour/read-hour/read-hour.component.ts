import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router, NavigationExtras } from '@angular/router';
import { Data } from 'src/app/services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-read-hour',
  templateUrl: './read-hour.component.html',
  styles: []
})
export class ReadHourComponent implements OnInit {

  employeesActives: any[] = [];
  startDate: string;
  endDate: string;

  constructor(private employee: EmployeeService,
              private router: Router,
              private dataShare: Data) {

    this.startDate = moment(this.dataShare.storage.startDate).format('DD MMMM');
    this.endDate = moment(this.dataShare.storage.endDate).format('DD MMMM YYYY');

    console.log('Titulo --> ' + this.dataShare.storage.startDate);

    this.employee.getEmployeeHoursById(this.dataShare.storage.id).subscribe( (data: any) => {
      this.employeesActives = data.data;
      console.log(data);
    });
  }

  ngOnInit() {
  }

}
