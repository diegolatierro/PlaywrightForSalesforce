import{Page, expect} from '@playwright/test'
import { NavigationPage } from './navigationPage'
import { AccountPage } from './accountPage'
import { ContactPage } from './contactPage'
import config from '../config.json';

export class PageManager{
    private readonly page:Page
    //Add private readonly variables that refer to different ts files  in the page-object folder in this section
    private readonly navigationPage: NavigationPage
    private readonly accountPage : AccountPage
    private readonly contactPage : ContactPage

    constructor(page: Page){
        this.page = page
        //Add instances of the variables mentioned above in this constructor, with this.page as parameter
        this.navigationPage = new NavigationPage(this.page)
        this.accountPage = new AccountPage(this.page)
        this.contactPage = new ContactPage(this.page)
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
    async initialize() {
        await this.page.goto(config.salesforce.url);
        await this.login().loginToSalesforce(config.salesforce.username, config.salesforce.password);
        await this.login().searchApplication('Service');
        await this.page.waitForLoadState('networkidle');
    }
}