import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router, NavigationExtras } from '@angular/router';
import { Data } from 'src/app/services/data.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styles: []
})
export class EmployeeComponent implements OnInit {

  allEmployees: any[] = [];
  idEmployee;

  constructor(private employee: EmployeeService, private router: Router, private dataShare: Data) {
    this.employee.getEmployees().subscribe( (data: any) => {
      this.allEmployees = data.data;
      console.log(data);
    });
  }

  execAction(idClient, action) {
    this.idEmployee = idClient;
    console.log(this.idEmployee + ' - ' + action);

    this.dataShare.storage = {
      id: idClient
    };

    if (action === 'R') {
      this.router.navigate(['/employee/read-employee']);
    }
    else if (action === 'U') {
      this.router.navigate([ '/employee/update-employee']);
    }
  }

  deleteAction() {
    console.log('deleteEmployeeById: ' + this.idEmployee);
    this.employee.delEmployeeById(this.idEmployee).subscribe( (data: any) => {
      console.log(data);

      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['employee']));
    });
  }

  ngOnInit() {
  }

}
