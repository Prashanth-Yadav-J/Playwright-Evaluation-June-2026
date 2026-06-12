import { Page, Locator } from '@playwright/test';

export class AddEmployeePage {
  private readonly page: Page;
  private readonly addEmployeeButton: Locator;

  public constructor(page: Page) {
    this.page = page;
    this.addEmployeeButton = page.locator('a:has-text("Add Employee")');
  }

  public async clickAddEmployee(): Promise<void> {
    await this.addEmployeeButton.click();
  }
}