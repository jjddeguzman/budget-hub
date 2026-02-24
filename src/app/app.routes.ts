import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { DashboardComponent } from './modules/dashboard/pages/dashboard.component';
import { TransactionsComponent } from './modules/transactions/pages/transactions.component';
import { BudgetsComponent } from './modules/budgets/pages/budgets.component';
import { SettingsComponent } from './modules/settings/pages/settings.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
      },
      {
        path: 'budgets',
        component: BudgetsComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
    ],
  },
];
