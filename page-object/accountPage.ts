import { Locator, Page } from '@playwright/test';
import { HelperBase } from './helperBase';

export class AccountPage extends HelperBase {

    constructor(page: Page) {
        super(page);
    }

    async createBasic(name: string) {
        await this.clickOnAccountTab();
        await this.clickOnNewButton();
        await this.createAnAccount(name);
    }

    async createComplete(){
        //empty mehtod to create an account with all the neccesary fields
    }

    async delete(name: string) {
        // Implementation for delete
        await this.clickOnAccountTab()
        await this.searchAnAccount(name)
        await this.deleteAccountOption()
        await this.deleteAccountConfirmation()
    }


    async clickOnAccountTab() {
        const newAccountTab = this.page.locator('a[title="Accounts"]')
        await newAccountTab.waitFor({ state: 'visible' })
        await newAccountTab.click()
    }

    async clickOnNewButton() {
        const newAccountButton = this.page.getByText('New').nth(1)
        await newAccountButton.waitFor({ state: 'visible' })
        await newAccountButton.click()
    }

    async createAnAccount(name: string) {
        const accountName = this.page.getByRole('textbox', { name: "Name" })
        await accountName.waitFor({ state: 'visible' })
        await accountName.fill(name)
        const saveButton = this.page.locator('button[name="SaveEdit"]')
        await saveButton.waitFor({ state: 'visible' })
        await saveButton.click()
    }
    async searchAnAccount(name: string){
        const searchAccountInput = this.page.getByPlaceholder('Search this list...')
        await searchAccountInput.waitFor({state: 'visible'})
        await searchAccountInput.fill(name)
        const refreshButton = this.page.locator('button[name="refreshButton"]')
        await refreshButton.click()
        const accountFinded = this.page.locator(`a[title="${name}"]`)
        await accountFinded.waitFor({ state: 'visible'})
        await accountFinded.click()
    }

    async deleteAccountOption() {
        const moreOptionsOnAccount = this.page.getByText("Show more actions")
        await moreOptionsOnAccount.waitFor({ state: 'visible' })
        await moreOptionsOnAccount.click()
        const deleteOption = this.page.getByText("Delete")
        await deleteOption.waitFor({ state: 'visible' })
        await deleteOption.click()
    }

    async deleteAccountConfirmation() {
        const deleteButtonOnConfirmation = this.page.locator('button[title="Delete"]')
        await deleteButtonOnConfirmation.waitFor({ state: 'visible' })
        await deleteButtonOnConfirmation.click()
    }
}
