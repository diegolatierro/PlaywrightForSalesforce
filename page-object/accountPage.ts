import { Page } from '@playwright/test';
import { BaseEntityPage } from './baseEntityPage';

export class AccountPage extends BaseEntityPage {
    constructor(page: Page) {
        super(page);
    }

    async createBasic(fields: { [key: string]: string }) {
        await this.navigateToTab('Accounts');
        await this.clickOnNewButton();
        await this.createEntity({
            'Account Name': fields['Name'],
            'Phone': fields['Phone'],
            'Website': fields['Website']
        });
    }

    async delete(name: string) {
        await this.navigateToTab('Accounts');
        await this.searchEntity(name);
        await this.deleteEntityOption();
        await this.deleteEntityConfirmation();
    }
}
