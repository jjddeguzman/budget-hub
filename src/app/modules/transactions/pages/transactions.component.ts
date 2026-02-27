import {
  Component,
  signal,
  computed,
  ChangeDetectionStrategy,
  Signal,
  WritableSignal,
  OnInit,
  DestroyRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs/operators';
import {
  ITransaction,
  IFormattedTransaction,
  ITransactionCategory,
  IAddTransaction,
} from '../models/transaction.model';
import { MOCK_TRANSACTIONS, MOCK_TRANSACTION_CATEGORIES } from '../mocks/transaction.mock';
import { TransactionsTableComponent } from '../components/transactions-table/transactions-table.component';
import { TransactionsFiltersComponent } from '../components/transactions-filters/transactions-filters.component';
import { AddTransactionModalComponent } from '../components/add-transaction-modal/add-transaction-modal.component';
import { PageHeaderComponent } from '../../../shared/components/page-header.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TransactionsTableComponent,
    TransactionsFiltersComponent,
    AddTransactionModalComponent,
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
      <app-transactions-filters [categories]="categories$()" [filtersForm]="filtersForm" />

      <!-- Transactions Table -->
      <app-transactions-table [transactions]="formattedTransactions$()" />

      <!-- Add Transaction Modal -->
      @if (isModalOpen$()) {
        <app-add-transaction-modal
          [categories]="categories$()"
          (onAdd)="onAddTransactionSubmit($event)"
          (onCancel)="closeModal()"
        />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent implements OnInit {
  public transactions$: WritableSignal<ITransaction[]> = signal<ITransaction[]>([]);
  public categories$: WritableSignal<ITransactionCategory[]> = signal<ITransactionCategory[]>([]);

  /**
   * Tracks modal visibility
   */
  public isModalOpen$ = signal(false);

  /**
   * Tracks form filter values reactively
   */

  public formattedTransactions$: Signal<IFormattedTransaction[]> = computed<
    IFormattedTransaction[]
  >(() => {
    /**
     * Computed signal that formats and filters transactions based on active filters
     *
     * @description
     * A reactive computed signal that automatically recalculates whenever its dependencies change.
     * Applies search, category, type, and date range filters to the transactions array.
     *
     * @dependencies
     * - transactions$ - Source transactions to filter
     * - formFilters$ - Current filter values (search, category, type, dateRange)
     *
     * @returns {Signal<IFormattedTransaction[]>} Filtered and formatted transactions
     *
     * @example
     * // In template:
     * <app-transactions-table [transactions]="formattedTransactions$()" />
     *
     * // Automatically updates when:
     * 1. User types in search field → formFilters$ changes → re-filters
     * 2. onAddTransactionSubmit() called → new transaction added → transactions$ changes → includes new transaction
     * 3. Category/type filter selected → formFilters$ changes → applies new filter
     *
     * @see onAddTransactionSubmit - Add new transaction and trigger computed update
     *
     * @reactivityPattern
     * Angular Signals with Computed Pattern:
     * - Tracks all signal reads inside the function (.formFilters$(), .transactions$())
     * - Creates implicit dependencies on those signals
     * - When any dependency updates, re-runs the entire computation
     * - Updates template via OnPush change detection
     * - No manual subscriptions or unsubscriptions needed
     */
    return this.filterTransactions(this.transactions$());
  });

  pageTitle: Signal<string> = signal('Transactions');
  pageDescription: Signal<string> = signal('Track and manage all your financial transactions.');
  pageButtonLabel: Signal<string> = signal('+ Add Transaction');

  // Filter form group
  filtersForm: FormGroup;

  private destroyRef = inject(DestroyRef);

  constructor(private fb: FormBuilder) {
    this.filtersForm = this.initFiltersForm();
  }

  private formFilters$: WritableSignal<any> = signal({
    search: '',
    category: 'All Categories',
    type: 'All Types',
    dateRange: '',
  });

  ngOnInit(): void {
    // Subscribe to form value changes and update signal with 300ms debounce
    this.filtersForm.valueChanges
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe((values) => {
        this.formFilters$.set(values);
      });
    this.initalizeMockValues();
  }

  initalizeMockValues(): void {
    // TODO: Remove mock data initialization and replace with real API calls
    this.transactions$.set(MOCK_TRANSACTIONS);
    this.categories$.set(MOCK_TRANSACTION_CATEGORIES);
  }

  /**
   * Filter transactions based on active filters and format them for display
   */
  private filterTransactions(transactions: ITransaction[]): IFormattedTransaction[] {
    const filters = this.formFilters$();

    return transactions
      .filter((tx) => {
        // Search filter - matches against description or category
        if (filters.search.trim()) {
          const searchTerm = filters.search.toLowerCase().trim();
          const matchesSearch =
            tx.description.toLowerCase().includes(searchTerm) ||
            tx.category.toLowerCase().includes(searchTerm);
          if (!matchesSearch) return false;
        }

        // Category filter
        if (filters.category !== 'All Categories') {
          if (tx.category !== filters.category) return false;
        }

        // Type filter (income/expense)
        if (filters.type !== 'All Types') {
          const typeMap: { [key: string]: string } = {
            Income: 'income',
            Expenses: 'expense',
          };
          if (tx.type !== typeMap[filters.type]) return false;
        }

        // Date range filter
        if (filters.dateRange) {
          const txDate = new Date(tx.date).getTime();
          const rangeDate = new Date(filters.dateRange).getTime();
          if (txDate > rangeDate) return false;
        }

        return true;
      })
      .map((tx) => ({
        ...tx,
        formattedAmount: `${tx.type === 'income' ? '+' : '-'}$${tx.amount}`,
      }));
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

  onAddTransaction = (): void => {
    this.isModalOpen$.set(true);
  };

  /**
   * Handle new transaction submission
   */
  onAddTransactionSubmit(transaction: IAddTransaction): void {
    const newTransaction: ITransaction = {
      id: `tx-${Date.now()}`,
      description: transaction.description,
      category: transaction.category,
      amount: transaction.amount,
      type: transaction.type,
      date: transaction.date,
    };

    // Add to transactions signal using set
    this.transactions$.set([...this.transactions$(), newTransaction]);
    this.closeModal();
  }

  /**
   * Close the modal
   */
  closeModal(): void {
    this.isModalOpen$.set(false);
  }
}
