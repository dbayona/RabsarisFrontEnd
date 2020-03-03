import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Data } from 'src/app/services/data.service';
import * as moment from 'moment';
import 'moment/locale/es';

@Component({
  selector: 'app-hour',
  templateUrl: './hour.component.html',
  styles: []
})
export class HourComponent implements OnInit {

  allHour: any[] = [];
  idEmployee;

  constructor(private employee: EmployeeService, private router: Router, private dataShare: Data) {
    this.employee.getEmployeesHour().subscribe( (data: any) => {
      this.allHour = data.data;
      console.log(this.allHour);
    });
  }

  ngOnInit() {
  }

  execAction(idClient, action, hour) {
    this.idEmployee = idClient;
    console.log('EXEC -> ' + this.idEmployee + ' - ' + action + ' - ' + hour.startdate + ' - ' + hour.enddate );
    this.dataShare.storage = {
      id: idClient,
      startDate: hour.startdate,
      endDate: hour.enddate
    };

    if (action === 'R') {
      this.router.navigate(['/hour/read-hour']);
    }
    else if (action === 'U') {
      this.router.navigate([ '/hour/update-hour']);
    }
  }

  deleteAction() {
    console.log('deleteHourById: ' + this.idEmployee);
    this.employee.delHourById(this.idEmployee).subscribe( (data: any) => {
      console.log(data);

      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['hour']));
    });
  }

}
