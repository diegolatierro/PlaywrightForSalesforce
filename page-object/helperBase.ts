import { Page } from '@playwright/test'
import { faker } from '@faker-js/faker';

/*export function generateFakeName(): string {
    return faker.person.firstName();
}*/
export class HelperBase{
    readonly page: Page

    constructor(page:Page){
        this.page = page
    }

    async waitForNumberOfSeconds (timeInSeconds: number){
        await this.page.waitForTimeout(timeInSeconds*1000)
    }
    async navigateToTab(tabName: string) {
        const tab = this.page.locator(`a[title="${tabName}"]`);
        await tab.waitFor({ state: 'visible' });
        await tab.click();
        await this.page.waitForLoadState('networkidle'); // Ensure the tab is fully loaded
    }
}