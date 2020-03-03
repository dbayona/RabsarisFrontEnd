import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router, NavigationExtras } from '@angular/router';
import { Data } from 'src/app/services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-update-hour',
  templateUrl: './update-hour.component.html',
  styles: []
})
export class UpdateHourComponent implements OnInit {

  employeesHours: any[] = [];
  startDate: string;
  endDate: string;

  constructor(private employee: EmployeeService,
              private router: Router,
              private dataShare: Data) {

    console.log('ID --> ' + this.dataShare.storage.id);
    console.log('ID_EMP --> ' + this.dataShare.storage.id_emp);

    if (this.dataShare.storage.id > 0 && typeof this.dataShare.storage.id_emp === 'undefined') {
      this.startDate = moment(this.dataShare.storage.startDate).format('DD MMMM');
      this.endDate = moment(this.dataShare.storage.endDate).format('DD MMMM YYYY');
    } else {
      this.startDate = this.dataShare.storage.startDate;
      this.endDate = this.dataShare.storage.endDate;
    }

    this.employee.getEmployeeHoursById(JSON.stringify(this.dataShare.storage.id)).subscribe( (data: any) => {
      this.employeesHours = data.data;
      console.log(data);
    },
    (error: any) => {
      console.log('ERROR: ');
      console.log(error);
    });
  }

  ngOnInit() {
  }

  onClick(employee) {
    console.log('Onclick Update Hour');
    console.log(employee);
    this.dataShare.storage = {
      id_hour: this.dataShare.storage.id,
      id_emp: employee.id,
      startDate: this.startDate,
      endDate: this.endDate,
      fullName: employee.fullname
    };
    this.router.navigate(['/hour/update-hour/update-hour-detail']);
  }

}
