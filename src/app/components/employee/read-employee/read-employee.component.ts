import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/Employee';
import { Data } from 'src/app/services/data.service';

@Component({
  selector: 'app-read-employee',
  templateUrl: './read-employee.component.html',
  styles: []
})
export class ReadEmployeeComponent implements OnInit {

  empleado: Employee;
  listOcupations: any[] = [];
  options: any[] = [];
  optionsGenre: any[] = [];

  constructor(private employee: EmployeeService,
              private router: ActivatedRoute,
              private dataShare: Data) {
    this.listOcupations = [
      { id: 1, label: 'Ayudante'},
      { id: 2, label: 'Plomero'}
    ];

    this.options = [
      { id: 1, label: 'Sí'},
      { id: 0, label: 'No'}
    ];

    this.optionsGenre = [
      { id: 'M', label: 'Masculino'},
      { id: 'F', label: 'Femenino'}
    ];

    // Llamado al servicio
    this.getEmployeeById(this.dataShare.storage);
  }

  // Metodo que llama al servicio de Listar un cliente
  getEmployeeById(id: any) {
    console.log('getEmployeeById --> ' + id);
    this.employee.getEmployeeById(id).subscribe( (data: any) => {
      this.empleado = data.data;
      console.log(data.data);
    });
  }

  ngOnInit() {
  }

}
