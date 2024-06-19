import { Page } from '@playwright/test';
import { BaseEntityPage } from './baseEntityPage';

export class AccountPage extends BaseEntityPage {
    constructor(page: Page) {
        super(page);
    }

    async createBasic(name: string) {
        await this.navigateToTab('Accounts');
        await this.clickOnNewButton();
        await this.createEntity({ 'Account Name': name });
    }

    async delete(name: string) {
        await this.navigateToTab('Accounts');
        await this.searchEntity(name);
        await this.deleteEntityOption();
        await this.deleteEntityConfirmation();
    }
}
