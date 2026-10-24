import { test,Page } from "@playwright/test"
import { PageManager } from "../../ToolShop/page_objects/PageManager"
import {faker} from "@faker-js/faker"


test.beforeEach(async({page}) => {
    
    await page.goto ('/')
})

test('navigate to SignIn page', async({page}) => {
    const pm = new PageManager(page)
    pm.navigateTo().SignInPage()

    
})


test('parametrized methods', async({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@rediffmail.com`

    pm.navigateTo().SignInPage()
    await pm.onSignInPage().SubmitPageWithCredentials()

})