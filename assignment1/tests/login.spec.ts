import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test('01-Successful Login', async ({ page }) => {
  const loginPage: LoginPage = new LoginPage(page);
  const dashboardPage: DashboardPage = new DashboardPage(page);

  await loginPage.navigate();
  await loginPage.login('Admin', 'admin123');

  await expect(page).toHaveURL(/dashboard/);
});

test('02-Failed Login with Wrong Password', async ({ page }) => {
  const loginPage: LoginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login('Admin', 'wrongpassword');

  const errorMessage: string = await loginPage.getErrorMessage();
  await expect(errorMessage).toContain('Invalid credentials');
});

test('03-Failed Login with Wrong Username', async ({ page }) => {
  const loginPage: LoginPage = new LoginPage(page);
  const dashboardPage: DashboardPage = new DashboardPage(page);

  await loginPage.navigate();
  await loginPage.login('Prashanth', 'admin123');
});