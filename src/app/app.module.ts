import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppheaderComponent } from './components/appheader/appheader.component';
import { AppmenuComponent } from './components/appmenu/appmenu.component';
import { AppfooterComponent } from './components/appfooter/appfooter.component';
import { AppsettingComponent } from './components/appsetting/appsetting.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { HourComponent } from './components/hour/hour.component';
import { AddEmployeeComponent } from './components/employee/add-employee/add-employee.component';
import { AddHourComponent } from './components/hour/add-hour/add-hour.component';
import { ClubComponent } from './components/payments/club/club.component';
import { PayrollComponent } from './components/payments/payroll/payroll.component';
import { PayrollDetailComponent } from './components/payments/payroll/payrolldetail/payrolldetail.component';
import { ReadPayrolldetailComponent } from './components/payments/payroll/payrolldetail/read-payrolldetail/read-payrolldetail.component';
import { LiquidationComponent } from './components/payments/liquidation/liquidation.component';
import { ThirdComponent } from './components/payments/third/third.component';
import { LiquidationDetailComponent } from './components/payments/liquidation/liquidationdetail/liquidationdetail.component';
import { ThirdDetailComponent } from './components/payments/third/thirddetail/thirddetail.component';
import { ReadThirdDetailComponent } from './components/payments/third/thirddetail/read-thirddetail/read-thirddetail.component';
import { ReadEmployeeComponent } from './components/employee/read-employee/read-employee.component';
import { UpdateEmployeeComponent } from './components/employee/update-employee/update-employee.component';

//Importar Rutas
import { ROUTES } from './app-routing.module';

//Providers
import { Data } from 'src/app/services/data.service';
import { UpdateHourComponent } from './components/hour/update-hour/update-hour.component';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ReadHourComponent } from './components/hour/read-hour/read-hour.component';
import { UpdateHourDetailComponent } from './components/hour/update-hour/update-hour-detail/update-hour-detail.component';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    AppmenuComponent,
    AppfooterComponent,
    AppsettingComponent,
    DashboardComponent,
    EmployeeComponent,
    HourComponent,
    AddEmployeeComponent,
    AddHourComponent,
    ClubComponent,
    PayrollComponent,
    PayrollDetailComponent,
    ReadPayrolldetailComponent,
    LiquidationComponent,
    ThirdComponent,
    LiquidationDetailComponent,
    ThirdDetailComponent,
    ReadThirdDetailComponent,
    ReadEmployeeComponent,
    UpdateEmployeeComponent,
    UpdateHourComponent,
    ReadHourComponent,
    UpdateHourDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    //AppRoutingModule
    FormsModule,
    RouterModule.forRoot(ROUTES, {useHash: true }),
  ],
  providers: [Data,
    {provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
