
import {Page} from "@playwright/test"
import { HelperBase } from './helperBase'

export class SignInPage extends HelperBase{
    // SignInPage: any
    
    // SignInPage() {
    //      throw new Error("Method not implemented.")
    //  }

    
    // constructor(page: Page) {
    //     super(page)
        
    // }

  /**
    * This method is to fill out the credentials for user
    * @param email - valid email for test user
    * @param password - valid password for test user
    */

    async SubmitPageWithCredentials(email: string, password: string) {
        const usingSignInForm = this.page.locator('[class = "form-control"]')
        await usingSignInForm.getByRole('textbox', {name:"Email address *"}).fill(email)
        await usingSignInForm.getByRole('textbox', {name:"Password *"}).fill(password)
        await usingSignInForm.getByRole('button', {name: "Login"}).click()

    }
    
    
}