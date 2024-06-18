import { Locator, Page } from '@playwright/test';
import { HelperBase } from './helperBase';

export class SalesPage extends HelperBase {

    constructor(page:Page){
        super(page)
    }

    async clickOnNewAccount(){
        const newAccountTab = this.page.getByText('Accounts').first()
        await newAccountTab.click()
    }

    async clickOnNewButton(){
        const newAccountButton = this.page.getByText('New').nth(1)
        await newAccountButton.click()
    }

    async createAnAccount(name : string){
        const accountName = this.page.getByRole('textbox', {name:"Name"})
        await accountName.fill(name)
        const saveButton = this.page.locator('button[name="SaveEdit"]')
        await saveButton.click()
    }
    async deleteAnAccount(name: string){
        
    }
}