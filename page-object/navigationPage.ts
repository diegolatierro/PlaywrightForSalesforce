import { Locator, Page } from '@playwright/test';
import { HelperBase } from './helperBase';

export class NavigationPage extends HelperBase {
    readonly loginEmailInputField: Locator;
    readonly loginPasswordInputField: Locator;
    readonly loginButton: Locator;
    readonly applicationButton: Locator;
    readonly applicationInputField: Locator;
    readonly casesTab: Locator;

    constructor(page: Page) {
        super(page);
        this.loginEmailInputField = page.locator('.username');
        this.loginPasswordInputField = page.locator('.password');
        this.loginButton = page.locator('input', { hasText: 'Log In' });
        this.applicationButton = page.locator('div[class="navexSetupNav"] div[class="tooltipTrigger tooltip-trigger uiTooltip"]');
        this.applicationInputField = page.getByPlaceholder('Search apps and items...');
        //this.casesTab = page.getByText('Case').first()
    }

    private getApplicationSelectionLocator(appName: string): Locator {
        return this.page.locator(`.al-menu-dropdown-list a[data-label="${appName}"]`);
    }

    async loginToSalesforce(username: string, password: string) {
        await this.loginEmailInputField.fill(username);
        await this.loginPasswordInputField.fill(password);
        await this.loginButton.click();
    }

    async searchApplication(appName: string) {
        await this.applicationButton.click();
        await this.applicationInputField.fill(appName);
        const applicationSelection = this.getApplicationSelectionLocator(appName);
        await applicationSelection.click();
    }
}
