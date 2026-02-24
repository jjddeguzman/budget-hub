import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IFormattedTransaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transactions-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
            <th class="px-6 py-3 text-right text-sm font-semibold text-gray-900">Amount</th>
            <th class="px-6 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          @for (item of transactions(); track item.id) {
            <tr class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 text-sm text-gray-900">{{ item.description }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ item.category }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">
                {{ item.date | date: 'MMM dd, yyyy' }}
              </td>
              <td
                [ngClass]="{
                  'text-green-600': item.type === 'income',
                  'text-gray-900': item.type === 'expense',
                }"
                class="px-6 py-4 text-sm text-right font-medium"
              >
                {{ item.formattedAmount }}
              </td>
              <td class="px-6 py-4 text-sm text-center">
                <button
                  (click)="onEdit.emit(item.id)"
                  class="text-teal-600 hover:text-teal-700 font-medium"
                >
                  Edit
                </button>
              </td>
            </tr>
          } @empty {
            <tr>
              <td colspan="5" class="px-6 py-8 text-center text-gray-500 text-sm">
                No transactions found
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsTableComponent {
  /**
   * List of formatted transactions to display
   */
  transactions = input.required<IFormattedTransaction[]>();

  /**
   * Emits when edit button is clicked
   */
  onEdit = output<string>();
}
