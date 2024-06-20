import { Page } from '@playwright/test'
import { LoginPage } from './navigationPage'
import { AccountPage } from './accountPage'
import { ContactPage } from './contactPage'
import { CasePage } from './casesPage'
import { OpportunityPage } from './opportunityPage'
import { LeadPage } from './leadPage'
import config from '../config.json';

export class PageManager{
    private readonly page:Page
    private readonly navigationPage: LoginPage
    private readonly accountPage : AccountPage
    private readonly contactPage : ContactPage
    private readonly casePage : CasePage
    private readonly opportunityPage : OpportunityPage
    private readonly leadPage : LeadPage

    constructor(page: Page){
        this.page = page
        this.navigationPage = new LoginPage(this.page)
        this.accountPage = new AccountPage(this.page)
        this.contactPage = new ContactPage(this.page)
        this.casePage = new CasePage(this.page)
        this.opportunityPage = new OpportunityPage(this.page)
        this.leadPage = new LeadPage(this.page)
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
    opportunity(){
        return this.opportunityPage
    }
    lead() {
        return new LeadPage(this.page);
    }
    async initialize(appName: string) {
        await this.page.goto(config.salesforce.url);
        await this.login().loginToSalesforce(config.salesforce.username, config.salesforce.password);
        await this.login().searchApplication(appName);
        await this.page.waitForLoadState('networkidle');
    }
}