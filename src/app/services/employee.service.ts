import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../models/Employee';
import { EmployeeHours } from '../models/EmployeeHours';
import { EmployeeHoursDetails } from '../models/EmployeeHoursDetails';
import { Clubs } from '../models/Clubs';
import { Hours } from '../models/Hours';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
    console.log('RabsarisApp Service Listo');
  }

  Url = 'http://localhost:3000';

  // List all employees
  getEmployees() {
    return this.http.get<Employee[]>(`${this.Url}/employees/all`);
  }

  // List employees hours
  getEmployeeHoursById(id) {
    return this.http.post<EmployeeHours[]>(`${this.Url}/employees/hours`, {id});
  }

  // List employees hours details
  getEmployeeHoursDetailsById(data) {
    console.log(`${this.Url}/employees/hours --> ` + data.id_hour);
    return this.http.post<EmployeeHoursDetails[]>(`${this.Url}/employees/hours/details`, data);
  }

  // List a employee by id
  getEmployeeById(id) {
    return this.http.post<Employee>(`${this.Url}/employees/read`, id);
  }

  // Create a employee
  postCreateEmployee(empleado: Employee) {
    return this.http.post<Employee>(`${this.Url}/employees/create`, empleado);
  }

  // Delete employee by id
  delEmployeeById(id) {
    return this.http.get<Employee>(`${this.Url}/employees/delete/${id}`);
  }

  // Update a employee by id
  putUpdateEmployeeById(empleado: Employee) {
    return this.http.put<Employee>(`${this.Url}/employees/update`, empleado);
  }

  // Create a employee
  postCreateHour(hours: Hours) {
    return this.http.post<Hours>(`${this.Url}/hours/create`, hours);
  }

  // Delete Hour by id
  delHourById(id) {
    return this.http.get<Hours>(`${this.Url}/hours/delete/${id}`);
  }

  // List all hours
  getEmployeesHour() {
    return this.http.get<Hours[]>(`${this.Url}/hours/all`);
  }

  // Update Worked Hours by employee
  putUpdateHoursDetails(data) {
    return this.http.put<EmployeeHoursDetails>(`${this.Url}/hours/details/update/`, data);
  }

  // List all clubs
  getEmployeesClub() {
    return this.http.get<Clubs[]>(`${this.Url}/clubs/all`);
  }

  // Update a club by id
  putUpdateClubById(club: Clubs) {
    return this.http.put<Clubs>(`${this.Url}/clubs/update`, club);
  }
}
