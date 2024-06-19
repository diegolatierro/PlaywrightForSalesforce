import { Page } from '@playwright/test';
import { BaseEntityPage } from './baseEntityPage';

export class ContactPage extends BaseEntityPage {
    constructor(page: Page) {
        super(page);
    }

    async createBasic(name: string) {
        await this.navigateToTab('Contacts');
        await this.clickOnNewButton();
        await this.createEntity({ 'Last Name': name });
    }

    async delete(name: string) {
        await this.navigateToTab('Contacts');
        await this.searchTopBar(name);
        await this.deleteEntityOption();
        await this.deleteEntityConfirmation();
    }
}
