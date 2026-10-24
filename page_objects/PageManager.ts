
import { Page, expect } from "@playwright/test";
import { SignInPage } from '../../ToolShop/page_objects/SignInPage'
import { NavigationPage } from "../../ToolShop/page_objects/NavigationPage"


export class PageManager{
    SignInPage() {
        throw new Error("Method not implemented.");
    }
    onSignInPage() {
        throw new Error("Method not implemented.");
    }

    private readonly page: Page
    private readonly signinPage:SignInPage 


constructor(page: Page) {
    this.page = page
    this.signinPage = new SignInPage(this.page)

    }    

    navigateTo() {

        return this.signinPage
    }

    
}