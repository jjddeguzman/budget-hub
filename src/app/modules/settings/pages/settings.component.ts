import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6 max-w-4xl">
      <!-- Page Header -->
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Settings</h1>
        <p class="text-gray-600 mt-1">Manage your account preferences and settings.</p>
      </div>

      <!-- Account Settings Section -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Account Settings</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value="John Doe"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              value="john@example.com"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value="+1 (555) 123-4567"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      <!-- Preferences Section -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Preferences</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Currency</label>
            <select
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option>USD - US Dollar ($)</option>
              <option>EUR - Euro (€)</option>
              <option>GBP - British Pound (£)</option>
              <option>CAD - Canadian Dollar (C$)</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Theme</label>
            <select
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option>Light</option>
              <option>Dark</option>
              <option>Auto</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
            <select
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option>MM/DD/YYYY</option>
              <option>DD/MM/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Notifications Section -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Notifications</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-900">Email Notifications</p>
              <p class="text-xs text-gray-600">Get updates about your account</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked class="sr-only peer" />
              <div
                class="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"
              ></div>
            </label>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-900">Budget Alerts</p>
              <p class="text-xs text-gray-600">Alert when budgets are exceeded</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked class="sr-only peer" />
              <div
                class="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"
              ></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Security Section -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Security</h2>
        <div class="space-y-3">
          <button
            class="w-full px-4 py-2 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span class="font-medium text-gray-900">Change Password</span>
            <p class="text-xs text-gray-600">Update your password regularly</p>
          </button>
          <button
            class="w-full px-4 py-2 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span class="font-medium text-gray-900">Two-Factor Authentication</span>
            <p class="text-xs text-gray-600">Add extra security to your account</p>
          </button>
        </div>
      </div>

      <!-- Danger Zone -->
      <div class="bg-red-50 border border-red-200 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-red-900 mb-4">Danger Zone</h2>
        <div class="space-y-3">
          <button
            class="w-full px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm"
          >
            Logout
          </button>
          <button
            class="w-full px-6 py-2 border border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors text-sm"
          >
            Delete Account
          </button>
        </div>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end gap-3">
        <button
          class="px-6 py-2 border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          class="px-6 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {}
