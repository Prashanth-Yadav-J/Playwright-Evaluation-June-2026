import { Page, Locator } from '@playwright/test';

export class EmployeeListPage {
  private readonly page: Page;
  private readonly employeeNameInput: Locator;
  private readonly searchButton: Locator;
  private readonly tableRows: Locator;
  private readonly nameCells: Locator;

  public constructor(page: Page) {
    this.page = page;
    this.employeeNameInput = page.locator('input[placeholder="Type for hints..."]').first();
    this.searchButton = page.locator('button:has-text("Search")');
    this.tableRows = page.locator('.oxd-table-body .oxd-table-row');
    this.nameCells = page.locator('.oxd-table-body .oxd-table-row div:nth-child(3)');
  }

  public async searchEmployee(name: string): Promise<void> {
    await this.employeeNameInput.click();
    await this.employeeNameInput.pressSequentially(name);
    await this.searchButton.click();
  }

  public async getRowCount(): Promise<number> {
    return await this.tableRows.count();
  }

  public async getAllNames(): Promise<string[]> {
    const count: number = await this.nameCells.count();
    const names: string[] = [];

    for (let i: number = 0; i < count; i++) {
      const text: string | null = await this.nameCells.nth(i).textContent();
      names.push((text ?? '').trim());
    }

    return names;
  }
}