import { expect } from '@playwright/test';

export class registeration_page {
    constructor(page) {
        this.page = page
        this.rightPanelTitle = page.locator('#rightPanel .title')
        this.rightPanelPara = page.locator('#rightPanel p')
        this.leftPanelPara = page.locator('#leftPanel p')
        this.firstName = page.locator('#customer\\.firstName')
        this.lastName = page.locator('#customer\\.lastName')
        this.street = page.locator('#customer\\.address\\.street')
        this.city = page.locator('#customer\\.address\\.city')
        this.state = page.locator('#customer\\.address\\.state')
        this.zipCode = page.locator('#customer\\.address\\.zipCode')
        this.phoneNumber = page.locator('#customer\\.phoneNumber')
        this.ssn = page.locator('#customer\\.ssn')
        this.usernameElement = page.locator('#customer\\.username')
        this.passwordElement = page.locator('#customer\\.password')
        this.repeatPassword = page.locator('#repeatedPassword')
        this.button = page.locator('.button')
    }

    async verifyPageLoaded() {
        await this.rightPanelTitle.waitFor()
        await expect(this.rightPanelTitle).toContainText('Signing up is easy!')
        await expect(this.page).toHaveTitle('ParaBank | Register for Free Online Account Access')
    }

    async fillDetails(username, password) {
        this.username = username
        await this.firstName.waitFor()
        await this.firstName.fill('Roshan')
        await this.lastName.fill('Ali')
        await this.street.fill('Test Street')
        await this.city.fill('Kolhapur')
        await this.state.fill('MH')
        await this.zipCode.fill('123456')
        await this.phoneNumber.fill('1234567895')
        await this.ssn.fill('ADFT456423')
        await this.usernameElement.fill(username)
        await this.passwordElement.fill(password)
        await this.repeatPassword.fill(password)
    }
    async clickRegiterAndVerify() {
        await this.button.last().click()
        await this.rightPanelTitle.waitFor()
        await expect(this.rightPanelTitle).toContainText('Welcome ' + this.username)
        await expect(this.rightPanelPara).toHaveText('Your account was created successfully. You are now logged in.')
        await expect(this.leftPanelPara).toContainText('Welcome Roshan Ali')
    }
}