import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router, NavigationExtras } from '@angular/router';
import { Data } from 'src/app/services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-payrolldetail',
  templateUrl: './payrolldetail.component.html'
})
export class PayrollDetailComponent implements OnInit {

  payrollDetails: any[] = [];
  startDate: string;
  endDate: string;
  mode: string;
  idHour;

  constructor(private employee: EmployeeService,
              private router: Router,
              private dataShare: Data) {

    if (typeof this.dataShare.storage.return === 'undefined') {
    this.startDate = moment(this.dataShare.storage.startDate).format('DD MMMM');
    this.endDate = moment(this.dataShare.storage.endDate).format('DD MMMM YYYY');
    }
    else {
      this.startDate = this.dataShare.storage.startDate;
      this.endDate = this.dataShare.storage.endDate;
    }

    this.mode = this.dataShare.storage.mode;
    console.log('Titulo --> ' + this.dataShare.storage.id);

    this.employee.postPayrollDetails(this.dataShare.storage.id).subscribe( (data: any) => {
      this.payrollDetails = data.data;
      console.log(data);
    });

  }

  ngOnInit() {
  }

  execAction(payRoll, action) {
    console.log('EXEC -> ' + payRoll.id_hour + ' - ' + action + ' - ' + this.startDate + ' - ' + this.endDate );
    this.dataShare.storage = {
      id_hour: payRoll.id_hour,
      id_emp: payRoll.id_emp,
      startDate: this.startDate,
      endDate: this.endDate,
      mode: action
    };

    if (action === 'R') {
      this.router.navigate(['/payments/payroll/payrolldetail/read-payrolldetail']);
    }
    else if (action === 'U') {
      this.router.navigate(['/payments/payroll/payrolldetail/update-payrolldetail']);
    }
  }

}
