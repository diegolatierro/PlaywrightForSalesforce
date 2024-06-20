import { Page } from '@playwright/test';
import { BaseEntityPage } from './baseEntityPage';

export class CasePage extends BaseEntityPage {
    private caseNumber: string | null = null;

    constructor(page: Page) {
        super(page);
    }

    async createBasic(subject: string) {
        await this.navigateToTab('Cases');
        await this.clickOnNewButton();
        await this.selectPicklistOption('button[aria-label="Status"]', 'New');
        await this.selectPicklistOption('button[aria-label="Case Origin"]', 'Phone');
        await this.createEntity({ 'Subject': subject });

        // Retrieve and store the Case Number
        this.caseNumber = await this.getCaseNumber();
    }

    async delete() {
        if (!this.caseNumber) {
            throw new Error("Case Number is not set. Cannot delete case.");
        }

        await this.navigateToTab('Cases');
        await this.searchEntity(this.caseNumber);
        await this.deleteEntityOption();
        await this.deleteEntityConfirmation();
    }

    private async getCaseNumber(): Promise<string> {
        const caseNumberLocator = this.page.locator('p:has-text("Case Number") + p lightning-formatted-text');
        await caseNumberLocator.waitFor({ state: 'visible' });
        return caseNumberLocator.innerText();
    }
}
