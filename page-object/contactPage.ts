import { Page } from '@playwright/test';
import { BaseEntityPage } from './baseEntityPage';

export class ContactPage extends BaseEntityPage {
    constructor(page: Page) {
        super(page);
    }

    async createBasic(fields: { [key: string]: string }) {
        await this.navigateToTab('Contacts');
        //await this.clickOnNewButton();
        await this.page.locator('button[name="NewContact"]').click()
        await this.createEntity(fields);
    }

    async delete(completeName: string) {
        await this.navigateToTab('Contacts');
        //await this.searchEntity(lastName);
        await this.searchTopBar(completeName);
        await this.deleteEntityOption();
        await this.deleteEntityConfirmation();
    }
}
