import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Clubs } from 'src/app/models/Clubs';
import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styles: []
})
export class ClubComponent implements OnInit {

  allClub: any[] = [];
  club: Clubs;
  idEmployee;

  showModal: boolean;
  UserId: string;
  Fullname: string;
  Monthlyfee: number;
  StartDate: string; // Date;
  EndDate: string; // Date;

  constructor(private employee: EmployeeService, private router: Router) {
    this.employee.getEmployeesClub().subscribe( (data: any) => {
      this.allClub = data.data;
      console.log(this.allClub);
    });
  }

  ngOnInit() {
    this.club = new Clubs();

    // Date picker
    $( () => {
      $('#datepicker').datepicker({
        autoclose: true
      }).on('changeDate', function(e) {
        // console.log('changeDate event trigger');
        this.focus();
       });
    });

    // Date picker
    $( () => {
      $('#datepicker2').datepicker({
        autoclose: true
      }).on('changeDate', function(e) {
        // console.log('changeDate event trigger');
        this.focus();
       });
    });
  }

  onClick(club) {
    console.log('onClick');
    // this.showModal = true; // Show-Hide Modal Check
    this.club = club;
    this.Fullname = club.firstname + ' ' + club.lastname;
    this.Monthlyfee = club.monthly_fee;
    this.StartDate = club.start_date;
    this.EndDate = club.end_date;
    console.log(this.club);
  }

  // Bootstrap Modal Close event
  hide() {
    this.showModal = false;
  }

  updateClub(event) {
    console.log('UpdateClub');
    this.club.start_date = moment(this.club.start_date).format('YYYY-MM-DD');
    this.club.end_date = moment(this.club.end_date).format('YYYY-MM-DD');
    console.log(this.club.start_date);
    this.employee.putUpdateClubById(this.club).subscribe( (data: any) => {
      console.log(this.club);
      console.log('Club Actualizado...');
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['payments/club']));
    });
  }

  cancelClub() {
    console.log('cancelClub');
    // this.showModal = true; // Show-Hide Modal Check
    this.club.monthly_fee = this.Monthlyfee;
    this.club.start_date = this.StartDate;
    this.club.end_date = this.EndDate;
    console.log(this.club);
  }
}
