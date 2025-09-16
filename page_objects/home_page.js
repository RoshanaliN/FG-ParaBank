const { expect } = require('@playwright/test');

export class home_page {
    constructor(page) {
        this.page = page
        this.footerPanel = page.locator('#footerPanel p')
        this.usernameElement = page.locator('input[name=username]')
        this.passwordElement = page.locator('input[name=password]')
        this.loginButton = page.locator('input[value="Log In"]')
        this.welcomeText = page.locator('#leftPanel p')
        this.homeButton = page.locator('.home')
        this.aboutUsButton = page.locator('.aboutus')
        this.contactButton = page.locator('.contact')
    }

    async launch() {
        await this.page.goto('https://parabank.parasoft.com/parabank/register.htm')
        await expect(this.footerPanel).toContainText('Parasoft. All rights reserved.')
    }

    async clickLeftPanelButton(buttonName) {
        await this.page.locator('a[href*=' + buttonName + ']').click()
    }

    async loginIntoAccount(username, password) {
        await this.usernameElement.fill(username)
        await this.passwordElement.fill(password)
        await this.loginButton.click()
        await expect(this.welcomeText).toContainText('Welcome Roshan Ali')
    }

    async verifyGlobalNavigation() {
        await this.homeButton.click()
        await expect(this.page).toHaveTitle('ParaBank | Welcome | Online Banking')
        await this.aboutUsButton.click()
        await expect(this.page).toHaveTitle('ParaBank | About Us')
        await this.contactButton.click()
        await expect(this.page).toHaveTitle('ParaBank | Customer Care')
    }

}