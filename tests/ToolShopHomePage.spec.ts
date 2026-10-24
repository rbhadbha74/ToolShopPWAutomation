
import {test,expect} from '@playwright/test'
import * as path from 'path'

test.beforeEach('login page', async({page}) => {
    await page.goto ('https://practicesoftwaretesting.com')
 
})

test('Sign In', async({page}) => {
    await page.locator('[class="nav-link"]').getByText('Sign in').click()
    //const emailAddressField = page.locator('[placeholder="Your email"]')
    //await emailAddressField.fill('rakheebhadbhade@rediffmail.com')
    //const emailAddressValue = await emailAddressField.inputValue()
    //expect(emailAddressValue).toEqual('rakheebhadbhade@rediffmail.com')
    //const passwordField = page.locator('[placeholder="Your password"]')
    //await passwordField.fill('Rbhadbha@1974')
    //const passwordValue = await passwordField.inputValue()
    //expect(passwordValue).toEqual('Rbhadbha@1974')
    const button = await page.getByRole('button', {name: " Sign in with Google"}).click()
    const [popup] = await Promise.all([page.locator('[class="pGzURd"]').getByText('Rakhee Bhadbhade').click()
    ])
    // page.locator('[class="yAlK0b"]').getByText('rakheebhadbhade@gmail.com').click()
    // page.locator('[class="VfPpkd-vQzf8d"]').getByText('Continue').click()
    // const accountPage = page.getByText('Here you can manage your profile, favorites and orders.')
    // await expect(accountPage).toHaveText('Here you can manage your profile, favorites and orders.')
//     await expect(page.locator('[class="icon-2x icon-signout"]').getByText('Logout')).toBeVisible()

})

test('Home Page Sort', async({page}) => {

    // items in asscending order

    const sortMenuAsc = page.locator('[class="form-select"]')
    await sortMenuAsc.click()
    const optionListAsc = page.locator('.form-select')
    await (optionListAsc).selectOption({value: "name,asc"})
    await expect(page.locator('.card-title').first()).toHaveText(' Adjustable Wrench ')
    await page.getByRole('button', {name: "Page-5"}).click()
    await expect(page.locator('.card-title').last()).toHaveText(' Wood Saw ')

    // items in descending order
    
    const sortMenuDsc = page.locator('[class="form-select"]')
    await sortMenuDsc.click()
    const optionListDsc = page.locator('.form-select')
    await (optionListDsc).selectOption({value: "name,desc"})
    await page.getByRole('button', {name: "Page-1"}).click()
    await expect(page.locator('.card-title').first()).toHaveText(' Wood Saw ')
    await page.getByRole('button', {name: "Page-5"}).click()
    await expect(page.locator('.card-title').last()).toHaveText(' Adjustable Wrench')

    // Items from Price High - Low

    const sortMenuPriceHighToLow = page.locator('[class="form-select"]')
    await sortMenuPriceHighToLow.click()
    const optionListPriceHighToLow = page.locator('.form-select')
    await (optionListPriceHighToLow).selectOption({value: "price,desc"})
    await page.getByRole('button', {name: "Page-1"}).click()
    await expect(page.locator('.card-footer').first()).toHaveText(' $89.55  ')
    await page.getByRole('button', {name: "Page-5"}).click()
    await expect(page.locator('.card-footer').last()).toHaveText(' $3.55 ')

    // Items from Price Low - High

    const sortMenuPriceLowToHigh = page.locator('[class="form-select"]')
    await sortMenuPriceLowToHigh.click()
    const optionListPriceLowToHigh = page.locator('.form-select')
    await (optionListPriceLowToHigh).selectOption({value: "price,asc"})
    await page.getByRole('button', {name: "Page-1"}).click()
    await expect(page.locator('.card-footer').first()).toHaveText(' $3.55 ')
    await page.getByRole('button', {name: "Page-5"}).click()
    await expect(page.locator('.card-footer').last()).toHaveText(' $89.55 ')

})

test('Home Page Search', async({page}) => {
    const searchField = page.locator('[placeholder="Search"]')
    await searchField.fill('Hammer')
    const searchValue = await searchField.inputValue()
    expect(searchValue).toEqual('Hammer')
    const button = await page.getByRole('button', {name: "Search"}).click()
    //await expect(page.locator('[data-test="search-caption"]')).toHaveText('Searched for: Hammer')
    const searchResult = (page.locator('[class="card-title"]').getByText(' Claw Hammer with Shock Reduction Grip '))
    await expect(searchResult).toBeVisible()

})

test('Categories', async({page}) => {
    await page.getByRole('checkbox', {name: "MightyCraft Hardware"} ).check({force: true})
    const byBrandcheck = (page.locator('[class="card-title"]').getByText(' Screws ')).click()
    await expect(page.getByLabel('brand')).toHaveText('MightyCraft Hardware')
    await page.locator('[class="nav-link active"]').getByText('Home').click()

})

test('contact', async({page}) =>{
    await page.locator('[class="nav-link"]').getByText('contact').click()
    const firstNameField = page.locator('[placeholder="Your first name *"]')
    await firstNameField.fill('John')
    const firstNameValue = await firstNameField.inputValue()
    expect(firstNameValue).toEqual('John')
    const lastNameField = page.locator('[placeholder="Your last name *"]')
    await lastNameField.fill('Smith')
    const lastNameValue = await lastNameField.inputValue()
    expect(lastNameValue).toEqual('Smith')
    const emailField = page.locator('[placeholder="Your email *"]')
    await emailField.fill('johnsmith@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('johnsmith@test.com')
    const dropDownMenu = page.getByRole('combobox', {name: "subject"})
    await(dropDownMenu).click()
   // const optionList = page.selectOption("select#subject", ["Customer service","Webmaster","Return","Payments","Warranty","Status of my order"])
    const optionList1 = page.selectOption("select#subject", ["Customer service"])
    expect(optionList1).toBeTruthy()
    const messageInput = page.getByRole('textbox', {name: "message"}).fill('Recieved Defective Hammer Please exchange for a new piece')
    expect (messageInput).toBeTruthy()
    await page.getByRole('button', {name: "Attachment"}).click()
    const filePath = path.join(__dirname, 'testfile.txt')
    await page.setInputFiles('input[type="file"]', filePath)
    //await expect(page.locator('[class="form-control ng-touched ng-dirty ng-invalid"]')).toHaveText('Only files with the extension are allowed, and files must be 0kb.')
    await page.getByRole('button', {name: "Send"}).click()
    await expect(page.locator('[class="alert alert-success mt-3"]')).toContainText(' Thanks for your message! We will contact you shortly. ')
    await page.locator('[class="nav-link"]').getByText('contact').click()
    

}) 

test('categories page', async({page}) => {
    const categories = page.locator('[class="nav-link dropdown-toggle"]').getByText('Categories')
    await categories.click()
    const handToolsItem = page.getByRole('link', {name: "Hand Tools"}).click()
    await expect(page.getByRole('heading',{name: "Category: Hand Tools"})).toBeVisible()
    await expect(page.locator('.card-title').first()).toHaveText(' Combination Pliers ')

})

test('rentals' , async({page}) => {
    const categories = page.locator('[class="nav-link dropdown-toggle"]').getByText('Categories')
    await categories.click()
    await page.locator('.dropdown-item').getByText('Rentals').click()
    await expect(page.getByRole('heading', {name: "Excavator"})).toBeVisible()

})



// test('lists and dropdowns', async({page}) => {
//     const dropDownMenu = page.locator('ngx-header nb-select')
//     await dropDownMenu.click()

//     page.getByRole('list') //when the list has UL tag
//     page.getByRole('listitem') //when the list has LI tag

//     const optionList = page.locator('nb-option-list nb-option')
//     await expect(optionList).toHaveText(["Light","Dark","Cosmic","Corporate"])
//     await optionList.filter({hasText: "Cosmic"}).click()
//     const header = page.locator('nb-layout-header')
//     await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

//     const colors = {
//         "Light": "rgb(255, 255, 255)",
//         "Dark": "rgb(34, 43, 69)",
//         "Cosmic": "rgb(50, 50, 89)",
//         "Corporate": "rgb(255, 255, 255)"
//     }

//     await dropDownMenu.click()
//     for (const color in colors) {
//         await optionList.filter({hasText: color}).click()
//         await expect(header).toHaveCSS('background-color', colors[color])
//         if (color != "Corporate")
//              await dropDownMenu.click()
//     }

// })