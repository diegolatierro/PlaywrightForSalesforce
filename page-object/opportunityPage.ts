import { Page } from '@playwright/test';
import { BaseEntityPage } from './baseEntityPage';

export class OpportunityPage extends BaseEntityPage {
    constructor(page: Page) {
        super(page);
    }

    async createBasic(name: string, closeDate: string, stage: string) {
        await this.navigateToTab('Opportunities');
        await this.clickOnNewButton();
        await this.selectPicklistOption('button[aria-label="Stage"]', stage); // Adjust as needed
        await this.createEntity({ 'Opportunity Name': name, 'Close Date': closeDate });
    }

    async delete(name: string) {
        await this.navigateToTab('Opportunities');
        await this.searchEntity(name);
        await this.deleteEntityOption();
        await this.deleteEntityConfirmation();
    }
}
