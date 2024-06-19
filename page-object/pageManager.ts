import { Page } from '@playwright/test'
import { LoginPage } from './navigationPage'
import { AccountPage } from './accountPage'
import { ContactPage } from './contactPage'
import { CasePage } from './casesPage'
import config from '../config.json';

export class PageManager{
    private readonly page:Page
    private readonly navigationPage: LoginPage
    private readonly accountPage : AccountPage
    private readonly contactPage : ContactPage
    private readonly casePage : CasePage

    constructor(page: Page){
        this.page = page
        this.navigationPage = new LoginPage(this.page)
        this.accountPage = new AccountPage(this.page)
        this.contactPage = new ContactPage(this.page)
        this.casePage = new CasePage(this.page)
    }

    login(){
        return this.navigationPage
    }
    account(){
        return this.accountPage
    }
    contact(){
        return this.contactPage
    }
    case(){
        return this.casePage
    }
    async initialize() {
        await this.page.goto(config.salesforce.url);
        await this.login().loginToSalesforce(config.salesforce.username, config.salesforce.password);
        await this.login().searchApplication('Service');
        await this.page.waitForLoadState('networkidle');
    }
}