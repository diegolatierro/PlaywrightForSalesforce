import{Page, expect} from '@playwright/test'
import { NavigationPage } from './navigationPage'
import { SalesPage } from './salesPage'

export class PageManager{
    private readonly page:Page
    //Add private readonly variables that refer to different ts files  in the page-object folder in this section
    private readonly navigationPage: NavigationPage
    private readonly salesPage: SalesPage

    constructor(page: Page){
        this.page = page
        //Add instances of the variables mentioned above in this constructor, with this.page as parameter
        this.navigationPage = new NavigationPage(this.page)
        this.salesPage = new SalesPage(this.page)
    }

    login(){
        return this.navigationPage
    }
    sales(){
        return this.salesPage
    }
}