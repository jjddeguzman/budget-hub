import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Budgets</h1>
          <p class="text-gray-600 mt-1">Create and manage budgets for different categories.</p>
        </div>
        <button
          class="px-6 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-md"
        >
          + Create Budget
        </button>
      </div>

      <!-- Budgets Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Sample Budget Card -->
        <div
          class="bg-white rounded-lg shadow-md p-6 border-l-4"
          [style.border-color]="'var(--orange-red)'"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Food & Dining</h3>
              <p class="text-sm text-gray-600">Monthly budget</p>
            </div>
            <button class="text-gray-400 hover:text-gray-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
          </div>

          <!-- Progress Bar -->
          <div class="mb-4">
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-medium text-gray-900">$320.50 / $500.00</span>
              <span class="text-sm text-gray-600">64%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-teal-600 h-2 rounded-full" style="width: 64%"></div>
            </div>
          </div>

          <div class="flex gap-2">
            <button
              class="flex-1 px-4 py-2 text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50 transition-colors text-sm font-medium"
            >
              Edit
            </button>
            <button
              class="flex-1 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
            >
              Delete
            </button>
          </div>
        </div>

        <!-- Sample Budget Card 2 -->
        <div
          class="bg-white rounded-lg shadow-md p-6 border-l-4"
          [style.border-color]="'var(--vivid-pink)'"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Transport</h3>
              <p class="text-sm text-gray-600">Monthly budget</p>
            </div>
            <button class="text-gray-400 hover:text-gray-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
          </div>

          <!-- Progress Bar -->
          <div class="mb-4">
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-medium text-gray-900">$150.00 / $300.00</span>
              <span class="text-sm text-gray-600">50%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-pink-600 h-2 rounded-full" style="width: 50%"></div>
            </div>
          </div>

          <div class="flex gap-2">
            <button
              class="flex-1 px-4 py-2 text-pink-600 border border-pink-600 rounded-lg hover:bg-pink-50 transition-colors text-sm font-medium"
            >
              Edit
            </button>
            <button
              class="flex-1 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State Fallback -->
      <div class="bg-white rounded-lg shadow-md p-12 text-center">
        <p class="text-gray-500 mb-4">No budgets created yet</p>
        <p class="text-sm text-gray-400">Click "Create Budget" to get started</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetsComponent {}
