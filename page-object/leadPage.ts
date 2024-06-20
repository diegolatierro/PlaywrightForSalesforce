import { Page } from '@playwright/test';
import { BaseEntityPage } from './baseEntityPage';

export class LeadPage extends BaseEntityPage {
    constructor(page: Page) {
        super(page);
    }

    async createBasic(name: string, company: string) {
        await this.navigateToTab('Leads');
        //await this.clickOnNewButton(); base entity new button does not work on leads
        const newButton = this.page.locator('div[class="header slds-page-header no-bottom-radius"]').getByText('New')
        await newButton.waitFor({ state: 'visible' });
        await newButton.click();
        await this.page.waitForLoadState('networkidle');
        
        await this.createEntity({ 'Last Name': name, 'Company': company });
    }

    async delete(name: string) {
        await this.navigateToTab('Leads');
        await this.searchTopBar(name);
        await this.deleteEntityOption();
        await this.deleteEntityConfirmation();
    }
}
