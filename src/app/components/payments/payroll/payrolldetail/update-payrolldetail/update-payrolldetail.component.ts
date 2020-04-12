import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { Data } from 'src/app/services/data.service';
import { Payroll } from 'src/app/models/Payroll';

@Component({
  selector: 'app-update-payrolldetail',
  templateUrl: './update-payrolldetail.component.html',
  styles: []
})
export class UpdatePayrolldetailComponent implements OnInit {

  payroll: Payroll;
  mode: String;
  startDate: string;
  endDate: string;

  constructor(private employee: EmployeeService,
              private router: Router,
              private dataShare: Data) {

    this.mode = this.dataShare.storage.mode;
    console.log('MODE --> ' + this.mode);

    this.startDate = this.dataShare.storage.startDate;
    this.endDate = this.dataShare.storage.endDate;

    // Llamado al servicio
    this.getPayrollByEmployee(this.dataShare.storage);
  }

  ngOnInit() {
  }

  // Metodo que llama al servicio de Listar un cliente
  getPayrollByEmployee(data: any) {
    console.log('getEmployeeById --> ');
    console.log(data);
    this.employee.postPayrollDetailByEmployee(data).subscribe( (data: any) => {
      this.payroll = data.data;
      console.log(data.data);
    });
  }

  // Store Data
  storeData() {
    this.dataShare.storage = {
      id: this.dataShare.storage.id_hour,
      id_emp: this.dataShare.storage.id_emp,
      startDate: this.dataShare.storage.startDate,
      endDate : this.dataShare.storage.endDate,
      mode: this.dataShare.storage.mode,
      return: true
    };

    console.log(this.dataShare.storage);
  }

  btnCancel() {
    this.storeData();
    this.router.navigate(['/payments/payroll/payrolldetail']);
  }

}
