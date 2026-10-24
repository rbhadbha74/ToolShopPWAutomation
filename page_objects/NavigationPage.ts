
import { Locator, Page } from '@playwright/test'
import { HelperBase } from "./helperBase";


export class NavigationPage extends HelperBase{

    
    constructor(page: Page) {
        super(page)
        
    }

    async SignInPage() {
        await this.selectGroupMenuItem('SignIn')
        await this.page.getByText('Sign in').click()
        await this.waitForNumberOfSeconds(2)
    }

    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if(expandedState == "false")
        await groupMenuItem.click()
    }
}