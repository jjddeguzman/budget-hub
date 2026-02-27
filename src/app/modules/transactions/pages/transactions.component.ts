import { Component, signal, computed, ChangeDetectionStrategy, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import {
  ITransaction,
  IFormattedTransaction,
  ITransactionCategory,
} from '../models/transaction.model';
import { MOCK_TRANSACTIONS, MOCK_TRANSACTION_CATEGORIES } from '../mocks/transaction.mock';
import { TransactionsTableComponent } from '../components/transactions-table/transactions-table.component';
import { TransactionsFiltersComponent } from '../components/transactions-filters/transactions-filters.component';
import { PageHeaderComponent } from '../../../shared/components/page-header.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TransactionsTableComponent,
    TransactionsFiltersComponent,
    PageHeaderComponent,
  ],
  template: `
    <div class="space-y-8">
      <!-- Page Header -->
      <app-page-header
        [title]="pageTitle()"
        [description]="pageDescription()"
        [buttonLabel]="pageButtonLabel()"
        (onButtonClick)="onAddTransaction()"
      />

      <!-- Filters -->
      <app-transactions-filters [categories]="categories()" [filtersForm]="filtersForm" />

      <!-- Transactions Table -->
      <app-transactions-table [transactions]="formattedTransactions()" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent {
  private transactions$: Signal<ITransaction[]> = signal<ITransaction[]>(MOCK_TRANSACTIONS);
  private categories$: Signal<ITransactionCategory[]> = signal<ITransactionCategory[]>(
    MOCK_TRANSACTION_CATEGORIES,
  );
  transactions: Signal<ITransaction[]> = this.transactions$;
  categories: Signal<ITransactionCategory[]> = this.categories$;

  // Filter form group
  filtersForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filtersForm = this.initFiltersForm();
  }

  /**
   * Initialize filter form group
   */
  private initFiltersForm(): FormGroup {
    return this.fb.group({
      search: [''],
      category: ['All Categories'],
      type: ['All Types'],
      dateRange: [''],
    });
  }

  pageTitle = (): string => 'Transactions';

  pageDescription = (): string => 'Track and manage all your financial transactions.';

  pageButtonLabel = (): string => '+ Add Transaction';

  onAddTransaction = (): void => console.log('Add Transaction button clicked');

  /**
   * Formats transactions for display with amount signs and currency symbol
   */
  formattedTransactions: Signal<IFormattedTransaction[]> = computed<IFormattedTransaction[]>(() =>
    this.transactions$().map((tx) => ({
      ...tx,
      formattedAmount: `${tx.type === 'income' ? '+' : '-'}$${tx.amount}`,
    })),
  );
}
