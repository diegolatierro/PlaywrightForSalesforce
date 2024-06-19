import { Locator, Page } from '@playwright/test';
import { HelperBase } from './helperBase';

export class LoginPage extends HelperBase {
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
        this.applicationButton = page.locator('button[title="App Launcher"]');
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
        // Wait for the page to load after login
        await this.page.waitForLoadState('networkidle');
    }

    async searchApplication(appName: string) {
        // Ensure the application button is visible and clickable
        await this.applicationButton.waitFor({ state: 'visible' });
        await this.applicationButton.click();
        
        // Ensure the application input field is visible before interacting
        await this.applicationInputField.waitFor({ state: 'visible' });
        await this.applicationInputField.fill(appName);

        // Locate the application selection and click it
        const applicationSelection = this.getApplicationSelectionLocator(appName);
        await applicationSelection.waitFor({ state: 'visible' });
        await applicationSelection.click();
        
        // Wait for the application to load completely
        await this.page.waitForLoadState('networkidle');
    }
}
