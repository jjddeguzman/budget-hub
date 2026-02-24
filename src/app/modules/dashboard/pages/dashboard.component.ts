import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p class="text-gray-600 mt-1">Welcome back! Here's your financial overview.</p>
      </div>

      <!-- Balance Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Total Balance Card -->
        <div
          class="bg-white rounded-lg shadow-md p-6"
          [style.border-top]="'4px solid var(--orange-red)'"
        >
          <p class="text-sm text-gray-600 font-medium">Total Balance</p>
          <p class="text-3xl font-bold text-gray-900 mt-2">$12,450.25</p>
          <p class="text-xs text-green-600 mt-2">+5.2% from last month</p>
        </div>

        <!-- Income Card -->
        <div
          class="bg-white rounded-lg shadow-md p-6"
          [style.border-top]="'4px solid var(--electric-violet)'"
        >
          <p class="text-sm text-gray-600 font-medium">Monthly Income</p>
          <p class="text-3xl font-bold text-gray-900 mt-2">$5,200.00</p>
          <p class="text-xs text-gray-500 mt-2">This month</p>
        </div>

        <!-- Expenses Card -->
        <div
          class="bg-white rounded-lg shadow-md p-6"
          [style.border-top]="'4px solid var(--vivid-pink)'"
        >
          <p class="text-sm text-gray-600 font-medium">Monthly Expenses</p>
          <p class="text-3xl font-bold text-gray-900 mt-2">$3,120.75</p>
          <p class="text-xs text-gray-500 mt-2">This month</p>
        </div>
      </div>

      <!-- Recent Transactions Section -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-900">Recent Transactions</h2>
          <a href="#" class="text-teal-600 hover:text-teal-700 text-sm font-medium">View All</a>
        </div>
        <div class="space-y-3">
          @for (i of emptyArray; track i) {
            <div class="flex items-center justify-between py-3 border-b border-gray-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gray-200"></div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Transaction Name</p>
                  <p class="text-xs text-gray-500">Today at 10:30 AM</p>
                </div>
              </div>
              <p class="text-sm font-medium text-gray-900">-$45.00</p>
            </div>
          }
          <p class="text-center text-gray-500 text-sm mt-8 py-8">No transactions yet</p>
        </div>
      </div>

      <!-- Budgets Overview -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-900">Budget Summary</h2>
          <a href="#" class="text-teal-600 hover:text-teal-700 text-sm font-medium">View All</a>
        </div>
        <p class="text-center text-gray-500 text-sm py-8">No budgets created yet</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  emptyArray: number[] = [];
}
