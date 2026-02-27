import { Component, output, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAddTransaction, ITransactionCategory } from '../../models/transaction.model';

@Component({
  selector: 'app-add-transaction-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <!-- Modal Backdrop -->
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <!-- Modal Container -->
      <div class="bg-white rounded-xl border border-gray-200 shadow-lg w-full max-w-md p-6">
        <!-- Header -->
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Add Transaction</h2>

        <!-- Form -->
        <form [formGroup]="transactionForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <input
              type="text"
              formControlName="description"
              placeholder="e.g., Grocery shopping"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span *ngIf="isFieldInvalid('description')" class="text-sm text-red-600 mt-1 block">
              Description is required
            </span>
          </div>

          <!-- Amount -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
            <input
              type="number"
              formControlName="amount"
              placeholder="0.00"
              step="0.01"
              min="0"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span *ngIf="isFieldInvalid('amount')" class="text-sm text-red-600 mt-1 block">
              Amount must be greater than 0
            </span>
          </div>

          <!-- Type -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Type *</label>
            <div class="flex gap-4">
              <label class="flex items-center">
                <input
                  type="radio"
                  formControlName="type"
                  value="income"
                  class="w-4 h-4 text-blue-500"
                />
                <span class="ml-2 text-sm text-gray-700">Income</span>
              </label>
              <label class="flex items-center">
                <input
                  type="radio"
                  formControlName="type"
                  value="expense"
                  class="w-4 h-4 text-blue-500"
                />
                <span class="ml-2 text-sm text-gray-700">Expense</span>
              </label>
            </div>
          </div>

          <!-- Category -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select
              formControlName="category"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option disabled value="">Select a category</option>
              <option *ngFor="let cat of categories()" [value]="cat.name">
                {{ cat.name }}
              </option>
            </select>
            <span *ngIf="isFieldInvalid('category')" class="text-sm text-red-600 mt-1 block">
              Category is required
            </span>
          </div>

          <!-- Date -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date *</label>
            <input
              type="date"
              formControlName="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span *ngIf="isFieldInvalid('date')" class="text-sm text-red-600 mt-1 block">
              Date is required
            </span>
          </div>

          <!-- Actions -->
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              (click)="onCancelClick()"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              [disabled]="!transactionForm.valid"
              class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTransactionModalComponent {
  categories = input.required<ITransactionCategory[]>();
  onAdd = output<IAddTransaction>();
  onCancel = output<void>();

  transactionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.transactionForm = this.initForm();
  }

  /**
   * Initialize form with validators
   */
  private initForm(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      type: ['expense', Validators.required],
      category: ['', Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required],
    });
  }

  /**
   * Check if field is invalid and touched
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.transactionForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.transactionForm.invalid) return;

    const formValue = this.transactionForm.value;
    const transaction: IAddTransaction = {
      ...formValue,
      date: new Date(formValue.date),
      amount: parseFloat(formValue.amount),
    };

    this.onAdd.emit(transaction);
    this.transactionForm.reset();
  }

  /**
   * Handle cancel button click
   */
  onCancelClick(): void {
    this.onCancel.emit();
  }
}
