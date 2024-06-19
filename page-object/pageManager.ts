import{Page, expect} from '@playwright/test'
import { NavigationPage } from './navigationPage'
import { AccountPage } from './accountPage'

export class PageManager{
    private readonly page:Page
    //Add private readonly variables that refer to different ts files  in the page-object folder in this section
    private readonly navigationPage: NavigationPage
    private readonly accountPage : AccountPage

    constructor(page: Page){
        this.page = page
        //Add instances of the variables mentioned above in this constructor, with this.page as parameter
        this.navigationPage = new NavigationPage(this.page)
        this.accountPage = new AccountPage(this.page)
    }

    login(){
        return this.navigationPage
    }
    account(){
        return this.accountPage
    }
}