import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ITransactionCategory } from '../../models/transaction.model';

@Component({
  selector: 'app-transactions-filters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="bg-white rounded-xl border border-gray-200 p-4">
      <form [formGroup]="filtersForm()">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search transactions..."
              formControlName="search"
              class="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              formControlName="category"
              class="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option>All Categories</option>
              @for (category of categories(); track category.id) {
                <option [value]="category.name">{{ category.name }}</option>
              }
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              formControlName="type"
              class="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option>All Types</option>
              <option>Income</option>
              <option>Expense</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <input
              type="date"
              formControlName="dateRange"
              class="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsFiltersComponent {
  /**
   * List of transaction categories
   */
  categories = input.required<ITransactionCategory[]>();

  /**
   * Form group containing all filter controls
   */
  filtersForm = input.required<FormGroup>();

  /**
   * Getter for search control
   */
  get searchControl(): FormControl<any> | null {
    return this.filtersForm().get('search') as FormControl<any> | null;
  }

  /**
   * Getter for category control
   */
  get categoryControl(): FormControl<any> | null {
    return this.filtersForm().get('category') as FormControl<any> | null;
  }

  /**
   * Getter for type control
   */
  get typeControl(): FormControl<any> | null {
    return this.filtersForm().get('type') as FormControl<any> | null;
  }

  /**
   * Getter for date range control
   */
  get dateRangeControl(): FormControl<any> | null {
    return this.filtersForm().get('dateRange') as FormControl<any> | null;
  }
}
