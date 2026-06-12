import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { EmployeeListPage } from '../pages/EmployeeListPage';

test('01-Employee search and validation', async ({ page }) => {
  const loginPage: LoginPage = new LoginPage(page);
  const dashboardPage: DashboardPage = new DashboardPage(page);
  const employeePage: EmployeeListPage = new EmployeeListPage(page);

  // Login
  await loginPage.navigate();
  await loginPage.login('Admin', 'admin123');

  // Navigate to PIM
  await dashboardPage.navigateToPIM();

  // Search employee
  await employeePage.searchEmployee('a');
  await page.waitForTimeout(2000);

  // Validate results
  const rowCount: number = await employeePage.getRowCount();
  expect(rowCount).toBeGreaterThan(0);

  // Collect names
  const names: string[] = await employeePage.getAllNames();

  for (const name of names) {
    expect(name.length).toBeGreaterThan(0);
  }
});