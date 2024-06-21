import { Page } from '@playwright/test';
import { BaseEntityPage } from './baseEntityPage';

export class OpportunityPage extends BaseEntityPage {
    constructor(page: Page) {
        super(page);
    }

    async createBasic(fields: { [key: string]: string }) {
        await this.navigateToTab('Opportunities');
        await this.clickOnNewButton();
        await this.selectPicklistOption('button[aria-label="Stage"]', fields['Stage']);
        await this.createEntity({
            'Opportunity Name': fields['Opportunity Name'],
            'Close Date': fields['Close Date']
        });
    }

    async delete(name: string) {
        await this.navigateToTab('Opportunities');
        await this.searchEntity(name);
        await this.deleteEntityOption();
        await this.deleteEntityConfirmation();
    }
}
