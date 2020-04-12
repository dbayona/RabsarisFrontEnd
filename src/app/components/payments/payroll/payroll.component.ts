import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Data } from 'src/app/services/data.service';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html'
})
export class PayrollComponent implements OnInit {

  allPayroll: any[] = [];
  idHour;

  constructor(private employee: EmployeeService, private router: Router, private dataShare: Data) {

    this.employee.getPayroll().subscribe( (data: any) => {
      this.allPayroll = data.data;
      console.log(this.allPayroll);
    });
  }

  ngOnInit() {
  }

  execAction(idHour, action, hour) {
    this.idHour = idHour;
    console.log('EXEC -> ' + this.idHour + ' - ' + action + ' - ' + hour.startdate + ' - ' + hour.enddate );
    this.dataShare.storage = {
      id: idHour,
      startDate: hour.startdate,
      endDate: hour.enddate,
      mode: action
    };

    if (action === 'R') {
      this.router.navigate(['/payments/payroll/payrolldetail']);
    }
    else if (action === 'U') {
      this.router.navigate(['/payments/payroll/payrolldetail']);
    }
  }

  deleteAction() {
    console.log('deleteHourById: ' + this.idHour);
    this.employee.delHourById(this.idHour).subscribe( (data: any) => {
      console.log(data);

      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['hour']));
    });
  }
}