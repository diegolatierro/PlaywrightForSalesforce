import { Page } from '@playwright/test';

export class BaseEntityPage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    protected async navigateToTab(tabName: string) {
        const tab = this.page.locator(`a[title="${tabName}"]`);
        await tab.waitFor({ state: 'visible' });
        await tab.click();
        //add a control for contact and the salesforce error
        await this.page.waitForLoadState('networkidle');
    }

    protected async clickOnNewButton() {
        const newButton = this.page.getByText('New').nth(1);
        await newButton.waitFor({ state: 'visible' });
        await newButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    protected async createEntity(fields: Record<string, string>) {
        for (const [label, value] of Object.entries(fields)) {
            const input = this.page.locator(`label:has-text("${label}")`).locator('..').locator('input');
            await input.fill(value);
        }
        const saveButton = this.page.locator('button[name="SaveEdit"]');
        await saveButton.waitFor({ state: 'visible' });
        await saveButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    protected async searchEntity(name: string) {
        const searchInput = this.page.getByPlaceholder('Search this list...');
        await searchInput.waitFor({ state: 'visible' });
        await searchInput.fill(name);
        const refreshButton = this.page.locator('button[name="refreshButton"]');
        await refreshButton.click();
        const entityFound = this.page.locator(`a[title="${name}"]`);
        await entityFound.waitFor({ state: 'visible' });
        await entityFound.click();
    }

    protected async deleteEntityOption() {
        const moreOptions = this.page.getByText('Show more actions');
        await moreOptions.waitFor({ state: 'visible' });
        await moreOptions.click();
        const deleteOption = this.page.getByText('Delete');
        await deleteOption.waitFor({ state: 'visible' });
        await deleteOption.click();
    }

    protected async deleteEntityConfirmation() {
        const deleteButton = this.page.locator('button[title="Delete"]');
        await deleteButton.waitFor({ state: 'visible' });
        await deleteButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    protected async searchTopBar(name:string){
        const searchButton = this.page.locator('button[aria-label="Search"]')
        await searchButton.click()
        const searchInput = this.page.getByPlaceholder('Search...');
        await searchInput.waitFor({ state: 'visible' });
        await searchInput.fill(name);
        await searchButton.click()
        await this.page.waitForLoadState('networkidle');
        await searchButton.click()
        const contactElement = this.page.locator(`span[title="${name}"]`)
        await contactElement.click()
    }
    async selectPicklistOption(picklistButtonLocator: string, optionText: string) {
        const picklistButton = this.page.locator(picklistButtonLocator);
        await picklistButton.waitFor({ state: 'visible' });
        await picklistButton.click();
        const option = this.page.locator('lightning-base-combobox-item').filter({ hasText: optionText });
        await option.waitFor({ state: 'visible' });
        await option.click();
    }
}
