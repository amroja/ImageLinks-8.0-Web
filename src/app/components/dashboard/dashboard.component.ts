import { Component } from '@angular/core';
import { AppPaymentsComponent } from './payments/payments.component';
import { AppProductsComponent } from './products/products.component';
import { AppRevenueUpdatesTwoComponent } from './revenue-updates/revenue-updates.component';
import { AppSalesOverviewComponent } from './sales-overview/sales-overview.component';
import { AppTotalEarningsComponent } from './total-earnings/total-earnings.component';
import { AppSalesProfitComponent } from './sales-profit/sales-profit.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    AppPaymentsComponent,
    AppProductsComponent,
    AppRevenueUpdatesTwoComponent,
    AppSalesOverviewComponent,
    AppTotalEarningsComponent,
    AppSalesProfitComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor() {}
}
