import { Locator, Page } from '@playwright/test';
import { HelperBase } from './helperBase';

export class ContactPage extends HelperBase {

    constructor(page: Page) {
        super(page);
    }

    async createBasic(name: string) {
        await this.navigateToTab("Contacts")
        await this.clickOnNewButton();
        await this.createBasicContact(name);
    }

    async createComplete(){
        //empty mehtod to create an account with all the neccesary fields
    }

    async delete(name: string) {
        // Implementation for delete
        await this.navigateToTab("Contacts")
        await this.searchContact(name)
        await this.deleteContactOption()
        await this.deleteContactConfirmation()
    }

    private async clickOnNewButton() {
        const newContactButton = this.page.locator('button[name="NewContact"]')
        await newContactButton.waitFor({ state: 'visible' })
        await newContactButton.click()
    }

    private async createBasicContact(lastName: string) {
        const firstNameInput = this.page.getByPlaceholder('Last Name')
        await firstNameInput.fill(lastName)
        const saveButton = this.page.locator('button[name="SaveEdit"]')
        await saveButton.waitFor({ state: 'visible' })
        await saveButton.click()
        await this.page.waitForLoadState('networkidle')
    }
    private async searchContact(name: string){
        //const searchbarButton = this.page.locator('button').first()
        const searchbarButton = this.page.locator('button[aria-label="Search"]')
        //await searchbarButton.waitFor({state: 'visible'})
        await this.page.waitForLoadState('networkidle')
        await searchbarButton.click()

        const searchInput = this.page.getByPlaceholder('Search...')
        await this.page.waitForLoadState('networkidle')
        await searchInput.fill(name)
        //await this.waitForNumberOfSeconds(5)

        const contactFinded = this.page.locator(`span[title="${name}"]`)
        await this.page.waitForLoadState('networkidle')
        await contactFinded.click()
    }

    private async deleteContactOption() {
        const moreOptionsOnAccount = this.page.getByText("Show more actions").first()
        await moreOptionsOnAccount.waitFor({ state: 'visible' })
        await moreOptionsOnAccount.click()
        const deleteOption = this.page.getByText("Delete")
        await deleteOption.waitFor({ state: 'visible' })
        await deleteOption.click()
    }

    private async deleteContactConfirmation() {
        const deleteButtonOnConfirmation = this.page.locator('button[title="Delete"]')
        await deleteButtonOnConfirmation.waitFor({ state: 'visible' })
        await deleteButtonOnConfirmation.click()
    }
}
