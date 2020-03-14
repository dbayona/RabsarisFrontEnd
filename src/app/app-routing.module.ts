import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeComponent } from './components/employee/employee.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HourComponent } from './components/hour/hour.component';
import { AddEmployeeComponent } from './components/employee/add-employee/add-employee.component';
import { ReadEmployeeComponent } from './components/employee/read-employee/read-employee.component';
import { UpdateEmployeeComponent } from './components/employee/update-employee/update-employee.component';
import { AddHourComponent } from './components/hour/add-hour/add-hour.component';
import { ReadHourComponent } from './components/hour/read-hour/read-hour.component';
import { UpdateHourComponent } from './components/hour/update-hour/update-hour.component';
import { UpdateHourDetailComponent } from './components/hour/update-hour/update-hour-detail/update-hour-detail.component';
import { ClubComponent } from './components/payments/club/club.component';
import { PayrollComponent } from './components/payments/payroll/payroll.component';
import { PayrollDetailComponent } from './components/payments/payroll/payrolldetail/payrolldetail.component';
import { ReadPayrolldetailComponent } from './components/payments/payroll/payrolldetail/read-payrolldetail/read-payrolldetail.component';
import { ThirdComponent } from './components/payments/third/third.component';
import { ThirdDetailComponent } from './components/payments/third/thirddetail/thirddetail.component';
import { LiquidationComponent } from './components/payments/liquidation/liquidation.component';
import { LiquidationDetailComponent } from './components/payments/liquidation/liquidationdetail/liquidationdetail.component';
import { ReadThirdDetailComponent } from './components/payments/third/thirddetail/read-thirddetail/read-thirddetail.component';


// const routes: Routes = [
export const ROUTES: Routes = [
{
  path: 'employee', component: EmployeeComponent
},
{
  path: 'employee/add-employee', component: AddEmployeeComponent
},
{
  path: 'employee/read-employee', component: ReadEmployeeComponent
},
{
  path: 'employee/update-employee', component: UpdateEmployeeComponent
},
{
  path: 'hour', component: HourComponent
},
{
  path: 'hour/add-hour', component: AddHourComponent
},
{
  path: 'hour/read-hour', component: ReadHourComponent
},
{
  path: 'hour/update-hour', component: UpdateHourComponent
},
{
  path: 'hour/update-hour/update-hour-detail', component: UpdateHourDetailComponent
},
{
  path: 'payments/club', component: ClubComponent
},
{
  path: 'payments/payroll', component: PayrollComponent
},
{
  path: 'payments/payroll/payrolldetail', component: PayrollDetailComponent
},
{
  path: 'payments/payroll/payrolldetail/read-payrolldetail', component: ReadPayrolldetailComponent
},
{
  path: 'payments/third', component: ThirdComponent
},
{
  path: 'payments/third/thirddetail', component: ThirdDetailComponent
},
{
  path: 'payments/third/thirddetail/read-thirddetail', component: ReadThirdDetailComponent
},
{
  path: 'payments/liquidation', component: LiquidationComponent
},
{
  path: 'payments/liquidation/liquidationdetail', component: LiquidationDetailComponent
},
{
  path: 'dashboard', component: DashboardComponent
},
{
  path: '', pathMatch: 'full', redirectTo: 'dashboard'
},
{
  path: '**', pathMatch: 'full', redirectTo: 'dashboard'
}
];

/*@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})*/
export class AppRoutingModule { }
