export class home_page {
    constructor(page) {
        this.page = page
    }

    async launch() {
        await this.page.goto('https://parabank.parasoft.com/parabank/register.htm')
        await expect(this.page.locator('#footerPanel p')).toContainText('Parasoft. All rights reserved.')
    }

    async clickLeftPanelButton(buttonName) {
        await page.locator('a[href*=' + pageName + ']').click()
    }

    async loginIntoAccount(username, password) {
        await page.locator('input[name=username]').fill(userName)
        await page.locator('input[name=password]').fill("Test@123")
        await page.locator('input[value="Log In"]').click()
        await expect(page.locator('#leftPanel p')).toContainText('Welcome Roshan Ali')
    }

}